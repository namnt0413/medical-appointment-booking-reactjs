import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import './HomeHeader.css';
import logo from '../../assets/images/logo.png'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils'
import { changeLanguageApp } from '../../store/actions'
import Header from '../Header/Header';
import { withRouter } from 'react-router'

class HomeHeader extends Component {

    changeLanguage = (language) => {
        // alert('Change language: ' + language);
        //fire redux event : actions
        this.props.changeLanguageAppRedux(language);
    }

    handleClickLogo = () => {
        if( this.props.history ){
            this.props.history.push(`/home`)
          }
    }

    render() {
        // console.log('check props : ', this.props); thuoc tinh language cua props lay tu redux chu ko phai la cua cha truyen den
        let language = this.props.language;
        return (
            // do render chi tra ve 1 khoi duy nhat
            <React.Fragment> 
                <header id="header" className="fixed-top">
                  <div className="container d-flex align-items-center">
                    <img src = {logo} onClick={()=>this.handleClickLogo() } alt="MedicalBokking" className="img-logo"/>
                    <nav id="navbar" className="navbar order-last order-lg-0">
                      <ul>
                        <li><a className="nav-link scrollto active" href="#">Home</a></li>
                        <li><a className="nav-link scrollto" href="#about">About</a></li>
                        <li><a className="nav-link scrollto" href="#services">Specialty</a></li>
                        <li><a className="nav-link scrollto" href="#departments">Clinics</a></li>
                        <li><a className="nav-link scrollto" href="#doctors">Doctors</a></li>
                        <li><a className="nav-link scrollto" href="#contact">Help</a></li>
                        {/* <li className="dropdown"><a href="#"><span>Drop Down</span> <i className="bi bi-chevron-down"></i></a>
                          <ul>
                            <li><a href="#">Drop Down 1</a></li>
                            <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
                              <ul>
                                <li><a href="#">Deep Drop Down 1</a></li>
                                <li><a href="#">Deep Drop Down 2</a></li>
                                <li><a href="#">Deep Drop Down 3</a></li>
                                <li><a href="#">Deep Drop Down 4</a></li>
                                <li><a href="#">Deep Drop Down 5</a></li>
                              </ul>
                            </li>
                            <li><a href="#">Drop Down 2</a></li>
                            <li><a href="#">Drop Down 3</a></li>
                            <li><a href="#">Drop Down 4</a></li>
                          </ul>
                        </li> */}
                      </ul>
                      <i className="bi bi-list mobile-nav-toggle"></i>
                    </nav>

                    <a href="#appointment" className="appointment-btn scrollto"><span className="d-none d-md-inline">Login or</span> Sign up</a>
                  </div>
                </header>

                { this.props.isShowBanner === true &&
                <>
                <section id="hero" className="d-flex align-items-center">
                  <div className="container">
                    <h1>Welcome to Medical Booking</h1>
                    <h2>We are team of talented designers making websites with Bootstrap</h2>
                    <a href="#about" className="btn-get-started scrollto">Get Started</a>
                  </div>
                </section>
                <section id="why-us" className="why-us">
                  <div className="container">

                    <div className="row">
                      <div className="col-lg-4 d-flex align-items-stretch">
                        <div className="content">
                          <h3>Why Choose Medilab?</h3>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit
                            Asperiores dolores sed et. Tenetur quia eos. Autem tempore quibusdam vel necessitatibus optio ad corporis.
                          </p>
                          <div className="text-center">
                            <a href="#" className="more-btn">Learn More <i className="bx bx-chevron-right"></i></a>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-8 d-flex align-items-stretch">
                        <div className="icon-boxes d-flex flex-column justify-content-center">
                          <div className="row">
                            <div className="col-xl-4 d-flex align-items-stretch">
                              <div className="icon-box mt-4 mt-xl-0">
                                <i className="bx bx-receipt"></i>
                                <h4>Corporis voluptates sit</h4>
                                <p>Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut aliquip</p>
                              </div>
                            </div>
                            <div className="col-xl-4 d-flex align-items-stretch">
                              <div className="icon-box mt-4 mt-xl-0">
                                <i className="bx bx-cube-alt"></i>
                                <h4>Ullamco laboris ladore pan</h4>
                                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt</p>
                              </div>
                            </div>
                            <div className="col-xl-4 d-flex align-items-stretch">
                              <div className="icon-box mt-4 mt-xl-0">
                                <i className="bx bx-images"></i>
                                <h4>Labore consequatur</h4>
                                <p>Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut maiores omnis facere</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </section>
                </>
                }
            </React.Fragment>
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));

