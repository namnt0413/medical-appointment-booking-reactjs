import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu , doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES ,USER_ROLE} from '../../utils'
import { changeLanguageApp } from '../../store/actions'
import _ from 'lodash'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }


    changeLanguage = (language) => {
        // console.log('change language : ' + language);
        this.props.changeLanguageAppRedux(language);
    }

    componentDidMount() {
        let { userInfo } = this.props;
        // console.log(this.props.userInfo);
        let menu = [];
        if(userInfo && !_.isEmpty(userInfo) ){
            let role = userInfo.roleId;
            if( role === USER_ROLE.ADMIN ){
                menu = adminMenu;
            }
            if (role === USER_ROLE.DOCTOR ){
                menu = doctorMenu;
            }
        }

        this.setState({ 
            menuApp: menu
        })
    }

    render() {
        // console.log(this.props)
        const { processLogout , language , userInfo } = this.props;
        //  === let language = this.props.language;
        // console.log(this.props)
 
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                {/* nút logout */}
                <div className="lang-logout">
                    <span className="welcome">Welcome {userInfo? userInfo.firstName : ""} {userInfo? userInfo.lastName : ""} </span>
                    <div className= { language === LANGUAGES.VI ? "language-vi active" :"language-vi"}><span onClick={() => this.changeLanguage(LANGUAGES.VI) }>VN</span></div>
                    <div className= { language === LANGUAGES.EN ? "language-en active" :"language-en"}><span onClick={() => this.changeLanguage(LANGUAGES.EN) }>EN</span></div>

                    <div className="btn btn-logout" onClick={processLogout} title="Log out">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
