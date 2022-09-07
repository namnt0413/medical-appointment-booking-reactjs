import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Specialty.scss';
import '../HomePage.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
// import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/specialty/120331-co-xuong-khop.jpg"

class HandBook extends Component {

    render() {
        return (
            <div className="section-share section-handbook">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Cẩm nang</span>
                        <button className="btn-section">XEM THÊM</button>
                    </div>

                    <div className="section-body">
                    <Slider {...this.props.settings}>
                    <div className="section-customize">
                        <div className="image section-handbook" />
                        <div>Co xuong khop 1</div>
                      </div>
                      <div className="section-customize">
                        <div className="image section-handbook" />
                        <div>Co xuong khop 2</div>
                      </div>
                      <div className="section-customize">
                        <div className="image section-handbook" />
                        <div>Co xuong khop 3</div>
                      </div>
                      <div className="section-customize">
                        <div className="image section-handbook" />
                        <div>Co xuong khop 4</div>
                      </div>
                      <div className="section-customize">
                        <div className="image section-handbook" />
                        <div>Co xuong khop 5</div>
                      </div>
                      <div className="section-customize">
                        <div className="image section-handbook" />
                        <div>Co xuong khop 6</div>
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
