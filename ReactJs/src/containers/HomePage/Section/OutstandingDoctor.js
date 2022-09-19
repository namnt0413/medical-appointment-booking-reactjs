import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import './OutstandingDoctor.scss'
import Slider from "react-slick";
// import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/specialty/120331-co-xuong-khop.jpg"
import * as actions from "../../../store/actions"
import { withRouter } from 'react-router'
import { FormattedMessage } from 'react-intl';


class OutstandingDoctor extends Component {
    constructor(props){
        super(props)
        this.state = {
            arrDoctors: [],
        }
    }


    componentDidMount(){
        this.props.fetchTopDoctors();
    }

    componentDidUpdate(prevProps,prevState, snapshot){
        if( prevProps.topDoctors !== this.props.topDoctors){
            this.setState({
                arrDoctors: this.props.topDoctors
            })
        }
    }

    handleViewDetailDoctor = (doctor) => {
        // console.log('view doctor detail : ',doctor)
        // redirect sang detail page
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }

    render() {
        let arrDoctors = this.state.arrDoctors
        // console.log(arrDoctors)
        return (
            <div className="section-share section-outstanding-doctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section"><FormattedMessage id="homepage.outstanding-doctor" /></span>
                        <button className="btn-section"><FormattedMessage id="homepage.more-info" /></button>
                    </div>

                    <div className="section-body">
                    <Slider {...this.props.settings}>
                    {arrDoctors && arrDoctors.length > 0 &&
                        arrDoctors.map( (item,index) => {
                            let imageBase64 = '';
                            if(item.image){
                                imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                            }
                            //let nameVi= `${item.positionData.valueVi`, {item.firstName} {item.lastName} 
                            //let nameEn = `${item.positionData.valueEn`, {item.firstName} {item.lastName}
                            
                            return (
                                <div className="section-customize" key={index} onClick={()=>this.handleViewDetailDoctor(item) } >
                                    <div className="outer-bg">
                                        <div  className="image section-outstanding-doctor"
                                        style = {{background: `url(${imageBase64})` }}

                                        />
                                    </div>
                                    <div className="postion text-center">
                                    {/* {console.log(item.positionData.valueVi)} */}
                                        <div>{item.positionData.valueVi} ,{item.firstName} {item.lastName}</div>
                                        <div>CHUYEN KHOA XXX</div>
                                    </div>
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
        topDoctors: state.admin.topDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopDoctors: () => dispatch(actions.fetchTopDoctors() )

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
