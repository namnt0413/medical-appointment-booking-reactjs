import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils'
import { changeLanguageApp } from '../../store/actions'

class Header extends Component {

    changeLanguage = (language) => {
        // console.log('change language : ' + language);
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        console.log(this.props)
        const { processLogout } = this.props;
        let language = this.props.language;
 
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                {/* nút logout */}
                <div className="lang-logout">
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
