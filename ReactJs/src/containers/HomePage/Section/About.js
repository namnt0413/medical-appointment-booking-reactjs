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
                      <div className="col-xl-5 col-lg-6 d-flex justify-content-center align-items-stretch position-relative">
                        <iframe width="100%" height="500" src="https://www.youtube.com/embed/Gr-8msO-AUI" title="DAOKO × 米津玄師『打上花火』MUSIC VIDEO" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        {/* <a href="#" className="glightbox play-btn mb-4"></a> */}
                      </div>

                      <div className="col-xl-7 col-lg-6 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5">
                        <h3><FormattedMessage id="homepage.about"/></h3>

                        <div className="icon-box">
                          <div className="icon"><i className="bx bx-fingerprint"></i></div>
                          <h4 className="title"><a href="">Lorem Ipsum</a></h4>
                          <p className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
                        </div>

                        <div className="icon-box">
                          <div className="icon"><i className="bx bx-gift"></i></div>
                          <h4 className="title"><a href="">Nemo Enim</a></h4>
                          <p className="description">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque</p>
                        </div>

                        <div className="icon-box">
                          <div className="icon"><i className="bx bx-atom"></i></div>
                          <h4 className="title"><a href="">Dine Pad</a></h4>
                          <p className="description">Explicabo est voluptatum asperiores consequatur magnam. Et veritatis odit. Sunt aut deserunt minus aut eligendi omnis</p>
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
