import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import './OutstandingDoctor.scss'
import Slider from "react-slick";
// import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
            <>
                <section id="doctors" className="doctors">
                    <div className="container">
    
                        <div className="section-title">
                          <h2>Doctors</h2>
                          <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
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
                                            <div className="pic" style = {{background: `url(${imageBase64})` }} onClick={()=>this.handleViewDetailDoctor(item) }></div>
                                            {/* style = {{background: `url(${imageBase64})` }} */}
                                            <h4 onClick={()=>this.handleViewDetailDoctor(item) }>{item.firstName} {item.lastName}</h4>
                                            <span>{item.positionData.valueVi}</span>
                                            <p>Chuyen khoa tim mach</p>
                                            <p>Benh vien Da khoa Thang Long Ha Noi</p>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopDoctors: () => dispatch(actions.fetchTopDoctors() )

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
