import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils'
import * as actions from "../../../store/actions"
import './ManageUserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
// import {getAllUsers , createNewUserService , deleteUserService, editUserService } from '../../../services/userService';
import TableManageUser from './TableManageUser'

class ManageUserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArray: [],
            positionArray: [],
            roleArray: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: ''
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
            let arrGenders = this.props.genders;
            // console.log(arrGenders)
            this.setState({
                genderArray: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            });
        }
        if( prevProps.positions !== this.props.positions ){
            let arrPositions = this.props.positions
            this.setState({
                positionArray: arrPositions,
                position: arrPositions && arrPositions.length >0 ? arrPositions[0].key : ''

            });
        }
        if( prevProps.roles !== this.props.roles ){
            let arrRoles = this.props.roles
            this.setState({
                roleArray: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key :''
            });
        }

        if(prevProps.users !== this.props.users){
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: ''
            })
        }

    }

    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file){
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL : objectUrl,
                avatar: file
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

    onChangeInput = (event,id) => {
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        },() =>{
            // console.log("check state",this.state); // set state la bat dong bo nen tra ve call back
        } )
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email','password','firstName','lastName','address','gender','role'];
        for( let i = 0; i < arrInput.length; i++ ){
            if( !this.state[arrInput[i]]){
                isValid = false;
                alert('Missing paramter : '+arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if( isValid ) {
            //fire redux action ( not call api anymore )
            // console.log('check state to fire action',this.state)
            this.props.createNewUser({
                email: this.state.email, 
                password: this.state.password,
                firstName: this.state.firstName,
                lastName:this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender, 
                roleId: this.state.role,
                positionId: this.state.position
            })
            // setTimeout( () => {
            //     this.props.fetchAllUsers()
            // },1000 )
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

        let { email , password , firstName , lastName ,
             phoneNumber , address , gender , position ,role , avatar } = this.state

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
                                <input type="text" className="form-control"
                                    value={email}
                                    onChange={(event)=>{this.onChangeInput(event,'email')}}
                                />
                            </div>
                            <div className="col-3">
                                <label>Password</label>
                                <input type="text" className="form-control"
                                    value={password}
                                    onChange={(event)=>{this.onChangeInput(event,'password')}}
                                />
                            </div>
                            <div className="col-3">
                                <label>First Name</label>
                                <input type="text" className="form-control"
                                    value={firstName}
                                    onChange={(event)=>{this.onChangeInput(event,'firstName')}}
                                />
                            </div>
                            <div className="col-3">
                                <label>Last Name</label>
                                <input type="text" className="form-control"
                                    value={lastName}
                                    onChange={(event)=>{this.onChangeInput(event,'lastName')}}
                                />
                            </div>  
                            <div className="col-3">
                                <label>Phone Number</label>
                                <input type="text" className="form-control"
                                    value={phoneNumber}
                                    onChange={(event)=>{this.onChangeInput(event,'phoneNumber')}}
                                />
                            </div>
                            <div className="col-9">
                                <label>Address</label>
                                <input type="text" className="form-control"
                                    value={address}
                                    onChange={(event)=>{this.onChangeInput(event,'address')}}
                                />
                            </div>
                            <div className="col-3">
                                <label>Gender</label>
                                <select className="form-control" onChange={(event)=>{this.onChangeInput(event,'gender')}}>
                                {genders && genders.length > 0 &&
                                    genders.map( (item,index) => {
                                       // {/* console.log(index,item); */}
                                        return(
                                       <option key={index} value={item.key} > { language===LANGUAGES.VI ? item.valueVi : item.valueEn} </option>
                                        )
                                    })
                            
                                }
                                </select>
                            </div>
                            <div className="col-3">
                                <label>Position</label>
                                <select className="form-control" onChange={(event)=>{this.onChangeInput(event,'position')}}>
                                    {positions && positions.length > 0 &&
                                    positions.map( (item,index) => {
                                       // {/* console.log(index,item); */}
                                        return(
                                       <option key={index} value={item.key}> { language===LANGUAGES.VI ? item.valueVi : item.valueEn} </option>
                                        )
                                    })
                            
                                }
                                </select>
                            </div>
                            <div className="col-3">
                                <label>Role</label>
                                <select className="form-control" onChange={(event)=>{this.onChangeInput(event,'role')}}>
                                    {roles && roles.length > 0 &&
                                    roles.map( (item,index) => {
                                       // {/* console.log(index,item); */}
                                        return(
                                       <option key={index} value={item.key}> { language===LANGUAGES.VI ? item.valueVi : item.valueEn} </option>
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

                            <div className="col-12 my-3"
                                onClick={ ()=>{this.handleSaveUser()}}
                            >
                                <button type="button" className="btn btn-primary">SAVE</button>
                            </div>
                            
                            <div className="col-12 mb-5">
                                <TableManageUser/>
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
        users: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),

        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchAllUsers: () => dispatch(actions.fetchAllUsersStart() )

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUserRedux);
