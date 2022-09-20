import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {getAllUsers , createNewUserService , deleteUserService, editUserService } from '../../../services/userService'; // import function in component
import ModalUser from './ModalUser'; // import component
import ModalEditUser from './ModalEditUser'; 
import { emitter } from '../../../utils/emitter'

class ManageUser extends Component {
    // Component life cycle
    // 1. Contructor : init state
    //2. Didmount : set state - unmount
    //3. Render

    //khoi tao theo chuan react
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false
        }
    }

    // phai su dung callback trong TH db lon, khi chay xong ham tren se chay xuong callback
    // if(response && response.errCode === 0){
    //     this.setState({
    //         arrUsers: response.users
    //     }, () => {
    //         console.log('check ',this.state.arrUsers);
    //     })
    //     console.log(this.state.arrUsers);
    // }
    async componentDidMount() {
       await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        // console.log(response);

        if(response && response.errCode === 0){
            this.setState({
                arrUsers: response.users
            })
            // console.log(this.state.arrUsers);
        }
    }

    
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }
    
    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }
    
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
        // alert('Add New User');
    }
    
    handleEditUser = async (user) => { 
        // console.log('edit user : ',user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }
    
    handleDeleteUser = async (user) => {
        console.log('delete user : ',user); 
        try {
            let res = await deleteUserService(user.id);
            // console.log(res);
            if(res && res.errCode === 0){
                await this.getAllUsersFromReact();
            }
            else{
                alert(res.errorMessage);
            }
        } catch (error) {
            console.log('error');
        }
    }
    
    //function ma thang cha tu dong cap nhat lai state sau khi thang con cap nhat lai props cua no (chi goi api khi validate chinh xac, ko thieu thong tin)
    createUserWithService = async (data) => {
        // console.log('check data from child: ',data);
        try {
            let response = await createNewUserService(data); // goi service de lay api tu nodeJS
            if( response && response.errCode !==0){
                alert(response.message);
            }
            else{
                //thanh cong va ko co loi
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalUser:false
                })
                emitter.emit('CLEAR_MODAL_DATA');
            }
            console.log('response create user : ',response);
        } catch (e) {
            console.log('e')
        }
    }

    editUserWithService = async (user) => {
        try {
            let response = await editUserService(user);

            if( response && response.errCode !==0){
                alert(response.message);
            }
            else{
                //thanh cong va ko co loi
                await this.getAllUsersFromReact();
                this.setState({
                    isOpenModalEditUser:false
                })
            }
            console.log('respons edit user : ',response);            

        } catch (error) {
            console.log('error')
        }
    
    
    }

    render() {
        //console.log('check render', this.state);
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
            <ModalUser
                isOpen = {this.state.isOpenModalUser} // truyen trang thai mo sang modal de co the dong duoc 
                toggleFromParent = {this.toggleUserModal} // truyen duoc ca 1 function
                // test = {'abc'}
                createUserFromParent = {this.createUserWithService}
            />

            { this.state.isOpenModalEditUser && // neu state isOpenModalEdit = true thi moi render ra modalEditUser
            <ModalEditUser                      // ( vi neu render luon thi se chay didmount cua modal do) =>chua bam nut thi chua co du lieu cho didmount
                isOpen = {this.state.isOpenModalEditUser} // truyen trang thai mo sang modal de co the dong duoc 
                toggleFromParent = {this.toggleUserEditModal} // truyen duoc ca 1 function
                currentUser = {this.state.userEdit}
                editUserFromParent = {this.editUserWithService}
            />
            }
                <div className="title text-center">Users Manage</div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3" onClick = { () => this.handleAddNewUser() } >
                    <i className="fas fa-plus"></i> Add new user</button>
                </div>
                <div className="users-table mt-3 mx-1">
                     <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                       
                      {/* su dung cau truc JSX de coode js trong html : {}
                            su dung map giong nhu vong lap for : item = arr[i] , index = i
                            su dung flagment giong nhu 1 cai div boc cac the trong JSX vi no chi nhan 1 khoi duy nhat     
                        */}
                            {arrUsers && arrUsers.map((item,index) => {
                               // console.log('check map',item,index);
                                return <> 
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className="btn-edit" onClick={ () => this.handleEditUser(item) } ><i className="fas fa-pencil-alt"></i></button>
                                        <button className="btn-delete" onClick={ () => this.handleDeleteUser(item) } ><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                </>
                            }) }
                     </tbody>
                     </table>
                </div>
            </div>


        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);
