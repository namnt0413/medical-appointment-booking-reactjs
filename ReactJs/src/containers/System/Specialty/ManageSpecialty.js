import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSpecialty.scss';
import {LANGUAGES , CommonUtils ,CRUD_ACTIONS} from '../../../utils';
import Select from 'react-select';
// import {getScheduleDoctorByDate} from '../../../services/userService'
import { FormattedMessage} from 'react-intl'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import {createNewSpecailty , updateSpecialtyService } from '../../../services/userService'
import {toast} from "react-toastify"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import TableManageSpecialty from './TableManageSpecialty'
import * as actions from "../../../store/actions"


// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            image: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            
            previewImgURL: '',
            isOpen: false,
            typeAction: '',
            isCreateSpecialty: false,
        }
    }

    async componentDidMount() {
        this.props.fetchAllSpecialty();
    }

    async componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.language !== this.props.language){

        }
        if(prevProps.allSpecialty !== this.props.allSpecialty){
            this.setState({
                id: '',
                name: '',
                image: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                typeAction: CRUD_ACTIONS.CREATE,
                previewImgURL: '',
            })
        }
        
    }

    openPreviewImage = () => {
        if(this.state.previewImgURL){
            this.setState({
                isOpen:true
            })
        }
        else return;
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
                image: base64
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

    handleSaveSpecialty = async () => {
        let action = this.state.typeAction;
        console.log('check : ' , this.state , action);
        if(action === CRUD_ACTIONS.CREATE) {
            let res = await createNewSpecailty(this.state);
            if( res && res.errCode === 0){
                toast.success('Tạo mới chuyên khoa thành công !')
                console.log(res)
            } else {
                toast.error('Tạo mới chuyên khoa thất bại')
            }
        }
        if( action === CRUD_ACTIONS.UPDATE){
            let res = await updateSpecialtyService({
                id: this.state.id,
                name: this.state.name,
                image: this.state.image,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
            });
            if( res && res.errCode === 0){
                toast.success('Chỉnh sửa chuyên khoa thành công')
                console.log(res)
            } else {
                toast.error('Chỉnh sửa chuyên khoa thất bại')
            }
            console.log(res);
        }
        this.props.fetchAllSpecialty();
        this.setState({
            isCreateSpecialty: false,
        })
    } 

    handleUpdateSpecialtyFromParent = (specialty) => {
        // console.log(specialty);
        this.setState({
            id: specialty.id,
            name: specialty.name,
            previewImgURL: specialty.image,
            image: specialty.image,
            descriptionMarkdown: specialty.descriptionMarkdown,
            descriptionHTML: specialty.descriptionHTML,
            typeAction: CRUD_ACTIONS.UPDATE,
            isCreateSpecialty: true,
        })
    }

    handleAddNewSpecialty = () => {
        this.setState({
            isCreateSpecialty: true,
            id: '',
            name: '',
            image: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            typeAction: CRUD_ACTIONS.CREATE,
            previewImgURL: '',
        })
    }

    render() {
        // console.log(this.state)
        let { isCreateSpecialty , language} = this.state;

        return (
            <>
            <div className="manage-specialty-container">
                <div className="title">
                    Manage Specialty
                </div>
                <div className="col-12 my-3">
                    <button className="btn-primary" onClick={() => this.handleAddNewSpecialty() } >Thêm chuyên khoa mới</button>
                </div>
                
                { isCreateSpecialty===true ?
                <>
                <div className="add-new-specialty row">
                    <div className="col-4 form-group">
                        <label className="">Ten chuyen khoa</label>
                        <input className="form-control" type="text" 
                            value={this.state.name} onChange={(event) => this.handleOnChangeInput(event,'name')}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label className="">Ten chuyen khoa (ENGLISH)</label>
                        <input className="form-control" type="text" 
                            // value={this.state.name} onChange={(event) => this.handleOnChangeInput(event,'name')}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label className="">Anh chuyen khoa </label>
                        <input className="form-control-file" id="previewImg" type="file" hidden  
                            onChange={(event)=>this.handleOnChangeImage(event) }
                        />
                        <label className="label-upload" htmlFor="previewImg">Upload Image<i className="fas fa-upload"></i></label>    
                        <div className="preview-image" 
                            style={{backgroundImage: `url(${this.state.previewImgURL})` }} 
                            onClick={ ()=>{this.openPreviewImage()} }
                        >
                        </div>
                    </div>
                    <div className="col-12 ">
                        <MdEditor 
                            style={{ height: '300px' }} 
                            renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange } 
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className="col-12 my-3">
                        <button type="button" className={ this.state.typeAction === CRUD_ACTIONS.UPDATE ?  "btn-save-specialty btn-warning" : "btn-save-specialty btn-primary" }  
                             onClick={ ()=>{this.handleSaveSpecialty()}}>SAVE
                        </button>
                    </div>
                </div>                    
                </>
                :
                <></>
                 }
                <div className="col-12 mb-5">
                    <TableManageSpecialty
                        handleUpdateSpecialtyFromParent= { this.handleUpdateSpecialtyFromParent }
                        typeAction = {this.state.typeAction}
                    />
                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                    mainSrc={this.state.previewImgURL}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                    />               
                }

            </div>
            

            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allSpecialty: state.admin.allSpecialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty() ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
