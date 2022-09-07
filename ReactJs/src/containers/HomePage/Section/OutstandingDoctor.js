import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import './OutstandingDoctor.scss'
import Slider from "react-slick";
// import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/specialty/120331-co-xuong-khop.jpg"

class OutstandingDoctor extends Component {

    render() {


        return (
            <div className="section-share section-outstanding-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Bác sĩ nổi bật tuần qua</span>
                        <button className="btn-section">Tim Kiem</button>
                    </div>

                    <div className="section-body">
                    <Slider {...this.props.settings}>
                    <div className="section-customize">
                        <div className="outer-bg">
                            <div  className="image section-outstanding-doctor" />
                        </div>
                        <div className="postion text-center">
                            <div>Bac si 1</div>
                            <div>Chuc vu 1</div>
                        </div>
                      </div>
                      <div className="section-customize">
                        <div className="outer-bg">
                            <div  className="image section-outstanding-doctor" />
                        </div>
                        <div className="postion text-center">
                            <div>Bac si 2</div>
                            <div>Chuc vu 1</div>
                        </div>
                      </div>
                      <div className="section-customize">
                        <div className="outer-bg">
                            <div  className="image section-outstanding-doctor" />
                        </div>
                        <div className="postion text-center">
                            <div>Bac si 3</div>
                            <div>Chuc vu 1</div>
                        </div>
                      </div>
                      <div className="section-customize">
                        <div className="outer-bg">
                            <div  className="image section-outstanding-doctor" />
                        </div>
                        <div className="postion text-center">
                            <div>Bac si 4</div>
                            <div>Chuc vu 1</div>
                        </div>
                      </div>
                      <div className="section-customize">
                        <div className="outer-bg">
                            <div  className="image section-outstanding-doctor" />
                        </div>
                        <div className="postion text-center">
                            <div>Bac si 5</div>
                            <div>Chuc vu 1</div>
                        </div>
                      </div>
                      <div className="section-customize">
                        <div className="outer-bg">
                            <div  className="image section-outstanding-doctor" />
                        </div>
                        <div className="postion text-center">
                            <div>Bac si 6</div>
                            <div>Chuc vu 1</div>
                        </div>
                      </div>
                    </Slider>
                    </div>


                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
