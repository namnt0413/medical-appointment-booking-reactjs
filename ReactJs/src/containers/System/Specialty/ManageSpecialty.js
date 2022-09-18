import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSpecialty.scss';
import {LANGUAGES , CommonUtils } from '../../../utils';
import Select from 'react-select';
// import {getScheduleDoctorByDate} from '../../../services/userService'
import { FormattedMessage} from 'react-intl'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import {createNewSpecailty} from '../../../services/userService'
import {toast} from "react-toastify"

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.language !== this.props.language){

        }
    }

    handleEditorChange = ({ html, text }) => {
        // console.log('handleEditorChange', html, text);
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            // console.log(base64);
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL : objectUrl,
                imageBase64: base64
            })
        }
    }

    handleOnChangeInput = ( event,id) => {
        let stateCopy = {...this.state};
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleSaveNewSpecialty = async () => {
        console.log('check : ' , this.state);
        let res = await createNewSpecailty(this.state);
        if( res && res.errCode === 0){
            toast.success('Create new specialty success')
            console.log(res)
        } else {
            toast.error('Create new specialty failed')
        }
    } 

    render() {
        // console.log(this.props.match.params.id)
        let language = this.props.language;

        return (
            <>
            <div className="manage-specialty-container">
                <div className="title">
                    Manage Specialty
                </div>
                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label className="">Ten chuyen khoa</label>
                        <input className="form-control" type="text" 
                            value={this.state.name} onChange={(event) => this.handleOnChangeInput(event,'name')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label className="">Anh chuyen khoa</label>
                        <input className="form-control-file" type="file" 
                            onChange={(event)=>this.handleOnChangeImage(event) }

                        />
                    </div>
                    <div className="col-12 ">
                        <MdEditor 
                            style={{ height: '300px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange } 
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12">
                        <button className="btn-save-specialty btn-success "
                            onClick={ () => this.handleSaveNewSpecialty() } 
                        >Save</button>
                    </div>
                </div>

            </div>
            

            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
