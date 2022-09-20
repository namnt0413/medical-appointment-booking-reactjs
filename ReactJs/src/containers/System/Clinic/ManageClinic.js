import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageClinic.scss';
import {LANGUAGES , CommonUtils ,CRUD_ACTIONS} from '../../../utils';
import Select from 'react-select';
// import {getScheduleDoctorByDate} from '../../../services/userService'
import { FormattedMessage} from 'react-intl'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import {createNewClinic , getAllClinic , deleteClinicService , updateClinicService } from '../../../services/userService'
import {toast} from "react-toastify"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import TableManageClinic from './TableManageClinic'
import * as actions from "../../../store/actions"


// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            image: '',
            address: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            
            previewImgURL: '',
            isOpen: false,
            typeAction: '',
            isCreateClinic: false,
        }
    }

    async componentDidMount() {
        this.props.fetchAllClinic();
    }

    async componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.language !== this.props.language){

        }
        if(prevProps.allClinic !== this.props.allClinic){
            this.setState({
                id: '',
                name: '',
                image: '',
                address: '',
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

    handleSaveClinic = async () => {
        let action = this.state.typeAction;
        console.log('check : ' , this.state , action);
        if(action === CRUD_ACTIONS.CREATE) {
            let res = await createNewClinic(this.state);
            if( res && res.errCode === 0){
                toast.success('Tạo mới phòng khám thành công !')
                console.log(res)
            } else {
                toast.error('Tạo mới phòng khám thất bại')
            }
        }
        if( action === CRUD_ACTIONS.UPDATE){
            let res = await updateClinicService({
                id: this.state.id,
                name: this.state.name,
                address: this.state.address,
                image: this.state.image,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
            });
            if( res && res.errCode === 0){
                toast.success('Chỉnh sửa phòng khám thành công')
                console.log(res)
            } else {
                toast.error('Chỉnh sửa phòng khám thất bại')
            }
            console.log(res);
        }
        this.props.fetchAllClinic();
        this.setState({
            isCreateClinic: false,
        })
    } 

    handleUpdateClinicFromParent = (clinic) => {
        // console.log(clinic);
        this.setState({
            id: clinic.id,
            name: clinic.name,
            address: clinic.address,
            previewImgURL: clinic.image,
            image: clinic.image,
            descriptionMarkdown: clinic.descriptionMarkdown,
            descriptionHTML: clinic.descriptionHTML,
            typeAction: CRUD_ACTIONS.UPDATE,
            isCreateClinic: true,
        })
    }

    handleAddNewClinic = () => {
        this.setState({
            isCreateClinic: true,
            id: '',
            name: '',
            address: '',
            image: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            typeAction: CRUD_ACTIONS.CREATE,
            previewImgURL: '',
        })
    }

    render() {
        // console.log(this.state)
        let { isCreateClinic , language} = this.state;

        return (
            <>
            <div className="manage-clinic-container">
                <div className="title">
                    Quản lý phòng khám
                </div>
                <div className="col-12 my-3">
                    <button className="btn-primary" onClick={() => this.handleAddNewClinic() } >Thêm phòng khám mới</button>
                </div>
                
                { isCreateClinic===true ?
                <>
                <div className="add-new-clinic row">
                    <div className="col-6 form-group">
                        <label className="">Tên phòng khám</label>
                        <input className="form-control" type="text" 
                            value={this.state.name} onChange={(event) => this.handleOnChangeInput(event,'name')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label className="">Ten phong kham (ENGLISH)</label>
                        <input className="form-control" type="text" 
                            // value={this.state.name} onChange={(event) => this.handleOnChangeInput(event,'name')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label className="">Địa chỉ phòng khám</label>
                        <input className="form-control" type="text" 
                            value={this.state.address} onChange={(event) => this.handleOnChangeInput(event,'address')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label className="">Ảnh phòng khám</label>
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
                        <button type="button" className={ this.state.typeAction === CRUD_ACTIONS.UPDATE ?  "btn-save-clinic btn-warning" : "btn-save-clinic btn-primary" }  
                             onClick={ ()=>{this.handleSaveClinic()}}>SAVE
                        </button>
                    </div>
                </div>                    
                </>
                :
                <></>
                 }
                <div className="col-12 mb-5">
                    <TableManageClinic
                        handleUpdateClinicFromParent= { this.handleUpdateClinicFromParent }
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
        allClinic: state.admin.allClinic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllClinic: () => dispatch(actions.fetchAllClinic() ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
