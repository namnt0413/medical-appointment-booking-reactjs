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
import * as actions from "../../store/actions";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      isShowMenu: false,
      isShowLanguage: false
    }
  }

    componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);
    };
    
    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    };

    handleScroll(event) {
      // console.log('the scroll things', event)
    };

    toggleClick() {
      this.setState({
         isShowMenu: !this.state.isShowMenu 
        });
    }
    toggleLanguageNavbar(){
      this.setState({
        isShowLanguage: !this.state.isShowLanguage 
       });
    }

    changeLanguage = (language) => {
        // alert('Change language: ' + language);
        //fire redux event : actions
        this.props.changeLanguageApp(language);
    }

    handleClickLogo = () => {
      if( this.props.history ){
          this.props.history.push(`/home`)
      }
      this.setState({
        isShowMenu: false
      })  
    }

    handleClickLogin = () => {
      if( this.props.history ){
          this.props.history.push(`/login`)
        }
    }

    handleClickLogout = () => {
      this.props.processLogout();
    }

    render() {
        // console.log('check props : ', this.props); thuoc tinh language cua props lay tu redux chu ko phai la cua cha truyen den
        let { isLoggedIn , userInfo, language } = this.props;
        let {isShowMenu , isShowLanguage} = this.state;
        return (
            // do render chi tra ve 1 khoi duy nhat
            <React.Fragment> 
                <header id="header" className="fixed-top" onScroll= { () => this.handleScroll() }>
                  <div className="container d-flex align-items-center">
                    <img src = {logo} onClick={()=>this.handleClickLogo() } alt="MedicalBokking" className="img-logo"/>
                    <nav id="navbar" className="navbar order-last order-lg-0">
                      <ul>
                        <li><a className="nav-link scrollto active" onClick={()=>this.handleClickLogo() } href="#hero"><FormattedMessage id="homeHeader.home"/></a></li>
                        <li><a className="nav-link scrollto" href="#specialty" onClick={()=>this.handleClickLogo() }><FormattedMessage id="homeHeader.specialty"/></a></li>
                        <li><a className="nav-link scrollto" href="#medical-facility" onClick={()=>this.handleClickLogo() }><FormattedMessage id="homeHeader.clinic"/></a></li>
                        <li><a className="nav-link scrollto" href="#doctors" onClick={()=>this.handleClickLogo() }><FormattedMessage id="homeHeader.doctor"/></a></li>
                        <li><a className="nav-link scrollto" href="#about" onClick={()=>this.handleClickLogo() }><FormattedMessage id="homeHeader.about"/></a></li>
                        <li><a className="nav-link scrollto" href="#help" onClick={()=>this.handleClickLogo() }><FormattedMessage id="homeHeader.help"/></a></li>
                        <li className="dropdown"><a href="#"><span><FormattedMessage id="homeHeader.language"/></span> <i className="bi bi-chevron-down"></i></a>
                          <ul>
                            <li className={ language === LANGUAGES.VI ? "active" :""}>
                              <a href="#" onClick={() => this.changeLanguage(LANGUAGES.VI) }><FormattedMessage id="homeHeader.vi"/><img className='vn-img'></img></a>
                            </li>
                            <li className={ language === LANGUAGES.EN ? "active" :""}>
                              <a href="#" onClick={() => this.changeLanguage(LANGUAGES.EN) }><FormattedMessage id="homeHeader.en"/><img className='uk-img'></img></a>
                            </li>
                            <li className={ language === LANGUAGES.JP ? "active" :""}>
                              <a href="#" onClick={() => this.changeLanguage(LANGUAGES.JP) }><FormattedMessage id="homeHeader.jp"/><img className='jp-img'></img></a>
                            </li>
                       
                          </ul>
                          {/* <ul>
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
                          </ul> */}
                        </li>
                        { isLoggedIn === true && 
                        <li className="dropdown"><a href="#"> <span className="welcome"> {userInfo? userInfo.firstName : ""} {userInfo? userInfo.lastName : ""} </span>
                        <i className="bi bi-chevron-down"></i></a>
                          <ul>
                            <li><a href="#"><FormattedMessage id="homeHeader.account_setting"/></a></li>
                            <li><a href="#"><FormattedMessage id="homeHeader.booking_history"/></a></li>
                            <li><a href="#"><FormattedMessage id="homeHeader.logout"/></a></li>
                          </ul>
                        </li>
                        }
                      </ul>
                      <i className={isShowMenu===false ? "bi bi-list mobile-nav-toggle" : "bi bi-x mobile-nav-toggle" }  
                        onClick={ () => {this.toggleClick()} }
                      >
                      </i>
                    </nav>

                    { isLoggedIn === false ? 
                    <a href="#" className="appointment-btn scrollto" onClick={()=>this.handleClickLogin()}><span className="d-none d-md-inline"><FormattedMessage id="homeHeader.login"/></span></a>
                    : <a href="#" className="appointment-btn scrollto" onClick={()=>this.handleClickLogout()}><span className="d-none d-md-inline"><FormattedMessage id="homeHeader.logout"/></span></a>}  
                  
                  
                    <div className="mobile-language"
                      onClick={ () => {this.toggleLanguageNavbar()}}
                    >
                      { language === LANGUAGES.VI ? <img className='vn-img'></img> 
                      : language === LANGUAGES.EN ? <img className='uk-img'></img>
                      : <img className='jp-img'></img> 
                      }
                      { isShowLanguage === true ?
                        <ul class="mobile-language-navbar">
                          <li className={ language === LANGUAGES.VI ? "active" :""}>
                            <a href="#" onClick={() => this.changeLanguage(LANGUAGES.VI) }>VI<img className='vn-img'></img></a>
                          </li>
                          <li className={ language === LANGUAGES.EN ? "active" :""}>
                            <a href="#" onClick={() => this.changeLanguage(LANGUAGES.EN) }>EN<img className='uk-img'></img></a>
                          </li>
                          <li className={ language === LANGUAGES.JP ? "active" :""}>
                            <a href="#" onClick={() => this.changeLanguage(LANGUAGES.JP) }>JP<img className='jp-img'></img></a>
                          </li>
                        </ul>
                        : ""
                      }
                    </div>
                  </div>


                  { isShowMenu === true ? 
                    <div className="mobile_menu">
                      <ul>
                        <li><a className="nav-link scrollto active" onClick={()=>this.handleClickLogo() } href="#hero"><FormattedMessage id="homeHeader.home"/></a></li>
                        <li><a className="nav-link scrollto" href="#specialty" onClick={()=>this.handleClickLogo() }><FormattedMessage id="homeHeader.specialty"/></a></li>
                        <li><a className="nav-link scrollto" href="#medical-facility" onClick={()=>this.handleClickLogo() }><FormattedMessage id="homeHeader.clinic"/></a></li>
                        <li><a className="nav-link scrollto" href="#doctors" onClick={()=>this.handleClickLogo() }><FormattedMessage id="homeHeader.doctor"/></a></li>
                        <li><a className="nav-link scrollto" href="#about" onClick={()=>this.handleClickLogo() }><FormattedMessage id="homeHeader.about"/></a></li>
                        <li><a className="nav-link scrollto" href="#help" onClick={()=>this.handleClickLogo() }><FormattedMessage id="homeHeader.help"/></a></li>
                      </ul>
                    </div>
                    :
                      ""
                  }

                </header>

                { this.props.isShowBanner === true &&
                <>
                <section id="hero" className="d-flex align-items-center">
                  <div className="container">
                    <h1><FormattedMessage id="homeBanner.banner_header"/></h1>
                    <h2><FormattedMessage id="homeBanner.banner_content"/></h2>
                    <a href="#specialty" className="btn-get-started scrollto"><FormattedMessage id="homeBanner.banner_button"/></a>
                  </div>
                </section>
                <section id="why-us" className="why-us">
                  <div className="container">

                    <div className="row">
                      <div className="col-lg-4 d-flex align-items-stretch">
                        <div className="content">
                          <h3><FormattedMessage id="homeBanner.why_choose"/></h3>
                          <p>
                            <FormattedMessage id="homeBanner.why_choose_reason"/>
                          </p>
                          <div className="text-center">
                            <a href="#about" className="more-btn"><FormattedMessage id="homeBanner.learn_more"/><i className="bx bx-chevron-right"></i></a>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-8 d-flex align-items-stretch">
                        <div className="icon-boxes d-flex flex-column justify-content-center">
                          <div className="row">
                            <div className="col-xl-4 d-flex align-items-stretch">
                              <div className="icon-box mt-4 mt-xl-0">
                                <i className="bx bx-receipt"></i>
                                <h4><FormattedMessage id="homeBanner.reason1"/></h4>
                                <p><FormattedMessage id="homeBanner.reason1_content"/></p>
                              </div>
                            </div>
                            <div className="col-xl-4 d-flex align-items-stretch">
                              <div className="icon-box mt-4 mt-xl-0">
                                <i className="bx bx-cube-alt"></i>
                                <h4><FormattedMessage id="homeBanner.reason2"/></h4>
                                <p><FormattedMessage id="homeBanner.reason2_content"/></p>
                              </div>
                            </div>
                            <div className="col-xl-4 d-flex align-items-stretch">
                              <div className="icon-box mt-4 mt-xl-0">
                                <i className="bx bx-images"></i>
                                <h4><FormattedMessage id="homeBanner.reason3"/></h4>
                                <p><FormattedMessage id="homeBanner.reason3_content"/></p>
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
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageApp: (language) => dispatch(changeLanguageApp(language))
        
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));

