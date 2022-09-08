import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils'
import * as actions from "../../../store/actions"
import './ManageUserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

class ManageUserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArray: [],
            positionArray: [],
            roleArray: [],
            previewImgURL: '',
            isOpen: false,
        }
    }

    async componentDidMount() {
        // try {
        //     let response = await getAllCodeService('gender');
        //     // console.log('check response', response);
        //     if( response && response.errCode === 0 ){
        //         this.setState({
        //             genderArray: response.data
        //         })
        //     }
        // } catch (error) {
        //     console.error(error);
        // }

        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps,prevState,snapshot) {
        if( prevProps.genders !== this.props.genders ){
            this.setState({
                genderArray: this.props.genders
            });
        }
        if( prevProps.positions !== this.props.positions ){
            this.setState({
                positionArray: this.props.positions
            });
        }
        if( prevProps.roles !== this.props.roles ){
            this.setState({
                roleArray: this.props.roles
            });
        }

    }

    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file){
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL : objectUrl
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

    render() {
        // console.log('check state', this.state)
        let genders = this.state.genderArray; // = set genders = 1 mang cac gender
        let positions = this.state.positionArray; // = set genders = 1 mang cac gender
        let roles = this.state.roleArray; // = set genders = 1 mang cac gender

        let language = this.props.language; // lay language tu redux
        let isLoadingGender = this.props.isLoadingGender

        return (
            <div className="user-redux-container" >
                <div className="title">
                    User mangage with REDUX
                </div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 my-3"><FormattedMessage id="manage-user.add"/></div>
                            <div className="col-12">{isLoadingGender ? 'Loading Gender' : ''}</div>
                            <div className="col-3">
                                <label>Email</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="col-3">
                                <label>Password</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="col-3">
                                <label>First Name</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="col-3">
                                <label>Last Name</label>
                                <input type="text" className="form-control"/>
                            </div>  
                            <div className="col-3">
                                <label>Phone Number</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="col-9">
                                <label>Address</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="col-3">
                                <label>Gender</label>
                                <select className="form-control">
                                <option selected>Choose</option>
                                {genders && genders.length > 0 &&
                                    genders.map( (item,index) => {
                                       // {/* console.log(index,item); */}
                                        return(
                                       <option key={index}> { language===LANGUAGES.VI ? item.valueVi : item.valueEn} </option>
                                        )
                                    })
                            
                                }
                                </select>
                            </div>
                            <div className="col-3">
                                <label>Position</label>
                                <select className="form-control">
                                    <option selected value="">Choose</option>
                                    {positions && positions.length > 0 &&
                                    positions.map( (item,index) => {
                                       // {/* console.log(index,item); */}
                                        return(
                                       <option key={index}> { language===LANGUAGES.VI ? item.valueVi : item.valueEn} </option>
                                        )
                                    })
                            
                                }
                                </select>
                            </div>
                            <div className="col-3">
                                <label>Role</label>
                                <select className="form-control">
                                    <option selected value="">Choose</option>
                                    {roles && roles.length > 0 &&
                                    roles.map( (item,index) => {
                                       // {/* console.log(index,item); */}
                                        return(
                                       <option key={index}> { language===LANGUAGES.VI ? item.valueVi : item.valueEn} </option>
                                        )
                                    })
                            
                                }
                                </select>
                            </div>
                            <div className="col-3">
                                <label>Image</label>
                                <div className="preview-img-container">
                                    <input id="previewImg" type="file" hidden 
                                        onChange={ (event) => this.handleOnChangeImage(event)} 
                                    />
                                    <label className="label-upload" htmlFor="previewImg">Upload Image<i className="fas fa-upload"></i></label>    
                                      {/* Lbel dai dien cgo input */}
                                    <div className="preview-image" 
                                        style={{backgroundImage: `url(${this.state.previewImgURL})` }} 
                                        onClick={ ()=>{this.openPreviewImage()} }
                                    >
                                    </div>
                                
                                </div>
                            </div>

                            <div className="col-12">
                                <button type="button" className="btn btn-primary">SAVE</button>
                            </div>
                        </div>
                    </div>
                </div>

            {this.state.isOpen === true &&
            <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
            
                />               
            }
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        roles: state.admin.roles,
        positions: state.admin.positions,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart())


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUserRedux);
