import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './MedicalFacility.scss'
import './MedicalFacility.css'
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
          <>
            <section id="medical-facility" className="medical-facility">
              <div className="container">
                  <div className="section-title">
                    <h2>Medical Facility</h2>
                    <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                  </div>
                  <div className="row">
                            <Slider {...this.props.settings}>
                              {dataClinic && dataClinic.length > 0 && 
                              dataClinic.map( (item,index) => {
                              return (
                              <div className="member d-flex align-items-start" key={index} >
                                  <div className="member-info">
                                      <div className="pic" style = {{background: `url(${item.image})` }} onClick={()=>this.handleViewDetailClinic(item)}></div>
                                      <h4 onClick={()=>this.handleViewDetailClinic(item)}>{item.name}</h4>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));

