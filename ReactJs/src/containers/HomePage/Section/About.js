import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../HomePage.scss';
import '../HomePage.css';
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
// import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/specialty/120331-co-xuong-khop.jpg"

class About extends Component {

    render() {
        return (
                <section id="about" className="about">
                  <div className="container-fluid">

                    <div className="row ml-3 mr-3">
                      <div className="about-video col-xl-6 col-lg-6 d-flex justify-content-center align-items-stretch position-relative">
                        <iframe width="100%" height="500" src="https://www.youtube.com/embed/3UYBsBnJe7U" title="DAOKO × 米津玄師『打上花火』MUSIC VIDEO" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        {/* <a href="#" className="glightbox play-btn mb-4"></a> */}
                      </div>

                      <div className="col-lg-6 icon-boxes d-flex flex-column align-items-stretch justify-content-center about-container">
                        <h3><FormattedMessage id="homepage.about"/></h3>
                        <p className='about-intro'>
                          <FormattedMessage id="about.about-intro"/>
                        </p>
                        <p className="about-benefit">
                          <FormattedMessage id="about.about-benefit"/>
                        </p>
                        <div className="icon-box">
                          <div className="icon"><i className="bx bx-time"></i></div>
                          <p className="description"><FormattedMessage id="about.about-time"/></p>
                        </div>
                        <div className="icon-box">
                          <div className="icon"><i className="bx bx-wifi"></i></div>
                          <p className="description"><FormattedMessage id="about.about-online"/></p>
                        </div>
                        <div className="icon-box">
                          
                          <div className="icon"><i className="bx bx-info-circle"></i></div>
                          <p className="description"><FormattedMessage id="about.about-info"/></p>
                        </div>

                      </div>
                    </div>

                  </div>
                </section>
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
      changeLanguageApp: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
