import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from "../../services/userService"
// import { userService } from "../../services/userService" khong can sd vi khi den services se tu dong chay index, trong index da khai bao

class Login extends Component {
    constructor(props) {
        super(props);
        this.btnLogin = React.createRef();
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({username: event.target.value});
        // console.log(event.target.value);
    }

    handleOnChangePassword = (event) => {
        this.setState({password: event.target.value});
        // console.log(event.target.value);
    }

    handleLogin = async () => {
        // console.log(this.state.username);
        // console.log(this.state.password);
        this.setState({
            errorMessage : ''
        })
        // console.log('all state : ' ,this.state);
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0 ) {
                this.setState({
                    errorMessage : data.message
                })
            }
            if( data && data.errCode === 0 ){
                // console.log('login sucess');
                this.props.userLoginSuccess(data.user)
            }


        } catch (error) {
            // console.log(error.response.data.message);
            if(error.response){
                if( error.response.data ){
                    this.setState({
                        errorMessage: error.response.data.message
                    })
                        // console.log(this.state.errorMessage);
                }

            }
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword : !this.state.isShowPassword
        })
    }

    render() {
        // Cu phap JSX 
        return (
        <div className="login-background">
            <div className="login-container">
                <div className="login-content row">
                    <div className="col-12 text-center login-title">Login</div>
                    <div className="col-12 form-group">
                        <label>Username: </label>
                        <input
                            type="text"
                            className="form-control login-input"
                            placeholder="Enter your user name"
                            value={this.state.username}
                            onChange = { (event) => this.handleOnChangeUsername(event) } // bat su thay doi
                        />

                    </div>
                    <div className="col-12 form-group">
                        <label>Password: </label>
                        <div className="login-password">
                            <input
                                type = { this.state.isShowPassword ? 'text' : 'password' }
                                className="form-control login-input"
                                placeholder="Enter your password"
                                value={this.state.password}
                                onChange = { (event) => this.handleOnChangePassword(event) } 
                            />
                                <span onClick={() => this.handleShowHidePassword()}>
                                    <i className={this.state.isShowPassword ? 'fas fa-eye show-password' : 'fas fa-eye-slash show-password'} ></i> 
                                    {/* Neu trang thai showPassword la false thi hien ra anh con mat*/}
                                </span>
                        </div>
                    </div>
                    <div className="col-12" style={{ color: 'red' }}>
                        <p>{ this.state.errorMessage  }</p>  
                        </div>
                    <div className="col-12">
                        <button
                            className="btn-login" onClick= {()=>{this.handleLogin();}}
                        >Login</button>
                    </div>
                    <div className="col-12">
                        <span className="forgot-password">Forgot your password?</span>
                    </div>
                    <div className="col-12 text-center login-with mt-3">
                        <span className="">Or login with:</span>
                    </div>
                    <div className="col-12 social-login">
                        <i className="fab fa-facebook social-icon fb"></i>
                        <i className="fab fa-google-plus social-icon gg"></i>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

// REDUX 
const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);









