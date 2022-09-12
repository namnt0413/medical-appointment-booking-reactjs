import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from "../../../store/actions"
import { LANGUAGES , CRUD_ACTIONS, CommonUtils } from '../../../utils'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailInfoDoctor } from '../../../services/userService';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown:'',
            contentHTML:'',
            selectedDoctor: '',
            description: '',

            listDoctors:[],
            hasOldData: false
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
    }

    componentDidUpdate(prevProps,prevState, snapshot) {
        if( prevProps.allDoctors !== this.props.allDoctors ){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if( prevProps.language !== this.props.language){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
    }

    handleChangeSelect = async (selectedDoctor) => { // react-select
        this.setState({ selectedDoctor }
        );
        let res = await getDetailInfoDoctor(selectedDoctor.value);
        console.log(res)
        if( res && res.errCode === 0 && res.data && res.data.Markdown.description && res.data.Markdown.contentHTML && res.data.Markdown.contentMarkdown ){
            let markdown = res.data.Markdown;
            this.setState({ 
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
            })
        } else {
            this.setState({ 
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
            }) 
        }
      };

    handleOnChangeDescription = (event) => {
        this.setState({
            description : event.target.value
        })
    } 

    handleEditorChange = ({ html, text }) => {
        // console.log('handleEditorChange', html, text);
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveInfoDoctor = () => {
        let {hasOldData} = this.state;
        this.props.saveInfoDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.UPDATE : CRUD_ACTIONS.CREATE
        })
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if( inputData && inputData.length > 0 ) {
            inputData.map((item, index) => {
                // console.log(item)
                let object = {};
                let labelVi = `${item.firstName} ${item.lastName}`
                let labelEn = `${item.lastName} ${item.firstName}`
                object.label = language===LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id
                result.push(object);
            })
        }
        return result;
    }

    render() {
        // console.log('state', this.state , this.state.selectedDoctor);

        return (
        <div className="manage-doctor-container">
            {/* <table id="ManageDoctor">
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>

                    { arrUsers && arrUsers.length > 0 && 
                        arrUsers.map((item,index)=>{
                            return(
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className="btn-edit" onClick={()=>this.handleUpdateUser(item) } ><i className="fas fa-pencil-alt"></i></button>
                                        <button className="btn-delete" onClick={()=>this.handleDeleteUser(item) } ><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
 
                </tbody>
            </table> */}
            
            <div className="manage-doctor-title title">
                THÔNG TIN CHI TIẾT BÁC SĨ
            </div>
            <div className="more-info">
                <div className="content-left form-group">
                    <label className="">Chọn bác sĩ</label>
                    <Select
                        value={this.state.selectedDoctor}
                        onChange={this.handleChangeSelect}
                        options={this.state.listDoctors}
                    />
                    
                </div>
                <div className="content-right">
                    <label className="">Thông tin giới thiệu</label>
                    <textarea className="form-control" rows="4"
                        onChange={ (event) => this.handleOnChangeDescription(event) }
                        value = {this.state.description}
                    >
                    </textarea>
                </div>

                
            </div>
            <div className="manage-doctor-editor">
                <MdEditor 
                    style={{ height: '500px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    onChange={this.handleEditorChange } 
                    value={this.state.contentMarkdown}
                />
            </div>

            <button className= { this.state.hasOldData===true ? "btn-save-content-doctor" : "btn-create-content-doctor" }       
                onClick={ () => this.handleSaveInfoDoctor() }
            >
                {this.state.hasOldData === true ?
                    <span>Lưu thông tin</span> : <span>Tạo thông tin</span>
                }
                
            </button>
        </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors() ),
       saveInfoDoctor: (data) => dispatch(actions.saveInfoDoctor(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
