import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './MedicalFacility.scss'
import Slider from "react-slick";
// import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/specialty/120331-co-xuong-khop.jpg"

class MedicalFacility extends Component {

    render() {


        return (
            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Cơ sở y tế nổi bật</span>
                        <button className="btn-section">XEM THÊM</button>
                    </div>

                    <div className="section-body">
                    <Slider {...this.props.settings}>
                    <div className="section-customize">
                        <div  className="image section-medical-facility" />
                        <div>Benh vien Nong nghiep 1</div>
                      </div>
                      <div className="section-customize">
                        <div  className="image section-medical-facility" />
                        <div>Benh vien Nong nghiep 2</div>
                      </div>
                      <div className="section-customize">
                        <div  className="image section-medical-facility" />
                        <div>Benh vien Nong nghiep 3</div>
                      </div>
                      <div className="section-customize">
                        <div  className="image section-medical-facility" />
                        <div>Benh vien Nong nghiep 4</div>
                      </div>
                      <div className="section-customize">
                        <div  className="image section-medical-facility" />
                        <div>Benh vien Nong nghiep 5</div>
                      </div>
                      <div className="section-customize">
                        <div  className="image section-medical-facility" />
                        <div>Benh vien Nong nghiep 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
