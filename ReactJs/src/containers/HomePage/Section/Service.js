import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../HomePage.scss';
import '../HomePage.css';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from 'react-router'


class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  async componentDidMount() {

  }
  
    render() {
        return (
                <section id="services" className="services">
                  <div className="container">

                    <div className="section-title">
                      <h2>Services</h2>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
                        <div className="icon-box">
                          <div className="icon"><i className="fas fa-heartbeat"></i></div>
                          <h4><a href="">Kham tu xa</a></h4>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-6 d-flex align-items-stretch ">
                        <div className="icon-box">
                          <div className="icon"><i className="fas fa-pills"></i></div>
                          <h4><a href="">Xet nghiem y hoc</a></h4>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
                        <div className="icon-box">
                          <div className="icon"><i className="fas fa-hospital-user"></i></div>
                          <h4><a href="">Magni Dolores</a></h4>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
                        <div className="icon-box">
                          <div className="icon"><i className="fas fa-dna"></i></div>
                          <h4><a href="">Nemo Enim</a></h4>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-6 d-flex align-items-stretch ">
                        <div className="icon-box">
                          <div className="icon"><i className="fas fa-wheelchair"></i></div>
                          <h4><a href="">Dele cardo</a></h4>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-6 d-flex align-items-stretch ">
                        <div className="icon-box">
                          <div className="icon"><i className="fas fa-notes-medical"></i></div>
                          <h4><a href="">Divera don</a></h4>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-6 d-flex align-items-stretch ">
                        <div className="icon-box">
                          <div className="icon"><i className="fas fa-notes-medical"></i></div>
                          <h4><a href="">Divera don</a></h4>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-6 d-flex align-items-stretch">
                        <div className="icon-box">
                          <div className="icon"><i className="fas fa-notes-medical"></i></div>
                          <h4><a href="">Divera don</a></h4>
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
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));

