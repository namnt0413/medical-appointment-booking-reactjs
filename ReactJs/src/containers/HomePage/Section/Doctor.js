import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import './Doctor.scss'
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
// import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions"
import { withRouter } from 'react-router'


class Doctor extends Component {
    constructor(props){
        super(props)
        this.state = {
            arrDoctors: [],
        }
    }


    async componentDidMount(){
        this.props.changeIsShowLoading(true);  // loading
        await this.props.fetchTopDoctors();
        this.props.changeIsShowLoading(false);  // loading
    }

    componentDidUpdate(prevProps,prevState, snapshot){
        if( prevProps.topDoctors !== this.props.topDoctors){
            this.setState({
                arrDoctors: this.props.topDoctors
            })
        }
    }

    handleViewDoctorDetail = (doctor) => {
        // console.log('view doctor detail : ',doctor)
        // redirect sang detail page
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }

    render() {
        let arrDoctors = this.state.arrDoctors
        let {language} = this.props;
        // console.log(arrDoctors)
        return (
            <>
                <section id="doctors" className="doctors">
                    <div className="container">
    
                        <div className="section-title">
                          <h2><FormattedMessage id="homepage.doctor"/></h2>
                        </div>
    
                        <div className="row">
                        <Slider {...this.props.settings}>
                        {arrDoctors && arrDoctors.length > 0 &&
                        arrDoctors.map( (item,index) => {
                            let imageBase64 = '';
                            if(item.image){
                                imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                            }
                            return (
                                    <div className="member d-flex align-items-start" key={index}>
                                        <div className="member-info">
                                            <div className="pic" style = {{background: `url(${imageBase64})` }} onClick={()=>this.handleViewDoctorDetail(item) }></div>
                                            {/* style = {{background: `url(${imageBase64})` }} */}
                                            <h4 onClick={()=>this.handleViewDoctorDetail(item) }>{item.firstName} {item.lastName}</h4>
                                            <span>{ language===LANGUAGES.VI ? item.positionData.valueVi 
                                                    : language===LANGUAGES.EN ? item.positionData.valueEn
                                                      : item.positionData.valueJp }
                                            </span>
                                            <p>{ language===LANGUAGES.VI ? item.Doctor_Info.specialtyData.name 
                                                    : language===LANGUAGES.EN ? item.Doctor_Info.specialtyData.nameEn
                                                      : item.Doctor_Info.specialtyData.nameJp }
                                            </p>
                                            <p>{ language===LANGUAGES.VI ? item.Doctor_Info.clinicData.name 
                                                    : language===LANGUAGES.EN ? item.Doctor_Info.clinicData.nameEn
                                                      : item.Doctor_Info.clinicData.nameJp }
                                            </p>
                                            <div className="social" >
                                              <a href=""><i className="ri-twitter-fill"></i></a>
                                              <a href="" ><i className="ri-facebook-fill"></i></a>
                                              <a href=""><i className="ri-instagram-fill"></i></a>
                                              <a href=""> <i className="ri-linkedin-box-fill"></i> </a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            }

                        
                        </Slider>
                        </div>
    
                    </div>
                </section>
                </>
            );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctors: state.admin.topDoctors,
        language: state.app.language,
        isShowLoading: state.app.isShowLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopDoctors: () => dispatch(actions.fetchTopDoctors() ),
        // changeLanguageApp: (language) => dispatch(changeLanguageApp(language))
        changeIsShowLoading: (isShowLoading) => dispatch(actions.changeIsShowLoading(isShowLoading))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
