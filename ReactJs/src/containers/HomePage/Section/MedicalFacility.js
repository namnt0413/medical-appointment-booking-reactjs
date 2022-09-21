import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './MedicalFacility.scss'
import Slider from "react-slick";
// import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/specialty/120331-co-xuong-khop.jpg"
import {getAllClinic} from "../../../services/userService"
import { withRouter } from 'react-router'

class MedicalFacility extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dataClinic: []
      }
    }

    async componentDidMount() {
      let res = await getAllClinic();
      // console.log(res);
      if( res && res.errCode === 0){
        this.setState({
          dataClinic: res.data ? res.data : []
        })
      }
    }

    handleViewDetailClinic = (item) => {
      // console.log(item);
      if( this.props.history ){
        this.props.history.push(`/detail-clinic/${item.id}`)
      }
    }


    render() {
      let {dataClinic} = this.state;

        return (
            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Cơ sở y tế nổi bật</span>
                        <button className="btn-section">XEM THÊM</button>
                    </div>

                    <div className="section-body">
                    <Slider {...this.props.settings}>
                    {dataClinic && dataClinic.length > 0 && 
                      dataClinic.map( (item,index) => {
                        return (
                          <div className="section-customize clinic-child" key={index} onClick={()=>this.handleViewDetailClinic(item)}>
                            <div  className="image section-medical-facility " 
                                style = {{background: `url(${item.image})` }}
                            />
                            <div className="clinic-name">{item.name}</div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));

