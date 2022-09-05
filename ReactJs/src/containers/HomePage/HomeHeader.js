import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/images/logo.png'
import { FormattedMessage } from 'react-intl';

class Header extends Component {

    render() {


        return (
            // do render chi tra ve 1 khoi duy nhat
            <React.Fragment> 
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <img src = {logo} ></img>
                        </div>
                        <div className="center-content">
                            <div className="child-content"> 
                                <div><b><FormattedMessage id="homeHeader.specialty"/></b></div> 
                                <div className="sub-title"><FormattedMessage id="homeHeader.searchDoctor"/></div>
                            </div>
                            <div className="child-content"> 
                                <div><b><FormattedMessage id="homeHeader.clinic"/></b></div> 
                                <div className="sub-title"><FormattedMessage id="homeHeader.chooseClinic"/></div>
                            </div>
                            <div className="child-content"> 
                                <div><b><FormattedMessage id="homeHeader.doctor"/></b></div> 
                                <div className="sub-title"><FormattedMessage id="homeHeader.chooseDoctor"/></div>
                            </div>
                            <div className="child-content"> 
                                <div><b><FormattedMessage id="homeHeader.medicalPackage"/></b></div> 
                                <div className="sub-title"><FormattedMessage id="homeHeader.generalHealthCheck"/></div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support"><i className="fas fa-question-circle"></i>Hỗ trợ</div>
                            <div className="language-vi">VN</div>
                            <div className="language-en">EN</div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className="content-up">
                        <div className="title-1">
                        Nền tảng y tế 
                        </div>
                        <div className="title-2">
                        <b> chăm sóc sức khỏe toàn diện</b>
                         </div>
                         <div className="search">
                            <i className="fas fa-search"></i>
                            <input type="search" placeholder="Tìm kiếm chuyên khoa khám bệnh"/>
                         </div>
                    </div>
                    <div className="content-down">
                         <div className="options-up">
                            <div className="option-child">
                                <div className="icon-child"><i className="far fa-hospital"></i></div>
                                <div className="text-child">Khám chuyên khoa</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-mobile-alt"></i></div>
                                <div className="text-child">Khám từ xa</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-procedures"></i></div>
                                <div className="text-child">Khám tổng quát</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fa fa-thermometer-quarter "></i></div>
                                <div className="text-child">Xét nghiệm y học</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fa fa-users"></i></div>
                                <div className="text-child">Sức khỏe tinh thần</div>
                            </div>
                         </div>
                         <div className="options-down">
                            <div className="option-child">
                                <div className="icon-child"><i className="far fa-hospital"></i></div>
                                <div className="text-child">Khám chuyên khoa</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-mobile-alt"></i></div>
                                <div className="text-child">Khám từ xa</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fas fa-procedures"></i></div>
                                <div className="text-child">Khám tổng quát</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fa fa-thermometer-quarter "></i></div>
                                <div className="text-child">Xét nghiệm y học</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child"><i className="fa fa-users"></i></div>
                                <div className="text-child">Sức khỏe tinh thần</div>
                            </div>
                         </div>
                        
                    </div>


                </div>
            </React.Fragment>
            );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
