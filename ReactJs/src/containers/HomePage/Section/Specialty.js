import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
// import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/specialty/120331-co-xuong-khop.jpg"

class Header extends Component {

    render() {

        let settings = {
            dots: false,
            infinite: true, 
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
          };

        

        return (
            <div className="section-specialty">
                <div className="speacialty-container">
                    <div className="specialty-header">
                        <span className="title-section">Chuyen khoa pho bien</span>
                        <button className="btn-section">Xem them</button>
                    </div>

                    <div className="specialty-body">
                    <Slider {...settings}>
                      <div className="specialty-customize">
                        <div className="bg-image"></div>
                        <div>Co xuong khop 1</div>
                      </div>
                      <div className="specialy-customize">
                        <img src= {specialtyImg} />
                        <div>Co xuong khop 2</div>
                      </div>
                      <div className="specialy-customize">
                        <img src= {specialtyImg} />
                        <div>Co xuong khop 3</div>
                      </div>
                      <div className="specialy-customize">
                        <img src= {specialtyImg} />
                        <div>Co xuong khop 4</div>
                      </div>
                      <div className="specialy-customize">
                        <img src= {specialtyImg} />
                        <div>Co xuong khop 5</div>
                      </div>
                      <div className="specialy-customize">
                        <img src= {specialtyImg} />
                        <h3>Co xuong khop 6</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
