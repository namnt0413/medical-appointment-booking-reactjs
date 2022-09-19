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
import {getAllSpecialty} from "../../../services/userService"

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: []
    }
  }
  
  async componentDidMount() {
    let res = await getAllSpecialty();
    if ( res && res.errCode ===0 ){
      this.setState({
        dataSpecialty: res.data ? res.data : []
      })
    }
    // console.log(res.data)
  }
  
    render() {
      let { dataSpecialty } = this.state;

        return (
            <div className="section-share section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section"><FormattedMessage id="homepage.specialty"/></span>
                        <button className="btn-section"><FormattedMessage id="homepage.more-info" /></button>
                    </div>

                    <div className="section-body">
                    <Slider {...this.props.settings}>
                      { dataSpecialty && dataSpecialty.length > 0 && 
                        dataSpecialty.map((item,index) => {
                          return (
                            <div className="section-customize specialty-child" key={index}>
                              <div className="image section-specialty" 
                                style = {{background: `url(${item.image})` }}
                              />
                              <div className="specialty-name">{item.name}</div>
                            </div>
                          )
                        })
                      }

                     
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
