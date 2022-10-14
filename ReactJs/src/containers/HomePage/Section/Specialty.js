import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../HomePage.scss';
import '../HomePage.css';
import './Specialty.scss';
import './Specialty.css'
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import Slider from "react-slick";
// import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/specialty/120331-co-xuong-khop.jpg"
import { getAllSpecialty } from "../../../services/userService"
import { getDetailSpecialtyById } from '../../../services/userService'
import { withRouter } from 'react-router'


class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
      selectedSpecialty: 3,
      selectedSpecialtyItem: {}
    }
  }

  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : []
      })
    }

    let selectedSpecialty = this.state.selectedSpecialty
    let selectedSpecialtyItem = await getDetailSpecialtyById({
      id: selectedSpecialty,
      location: 'ALL'

    });
    this.setState({
      selectedSpecialty: selectedSpecialty,
      selectedSpecialtyItem: selectedSpecialtyItem.data
    })
    // console.log(res.data)
  }

  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`)
    }
  }

  handleViewShortDescriptionSpecialty = async (item) => {
    // console.log(item);
    let selectedSpecialtyItem = await getDetailSpecialtyById({
      id: item,
      location: 'ALL'

    });
    this.setState({
      selectedSpecialty: item,
      selectedSpecialtyItem: selectedSpecialtyItem.data
    })
  }

  handleSetIcon (item) {
    // fa-solid fa-tooth  fa-solid fa-heart-pulse  fa-solid fa-brain fa-sharp fa-solid fa-lungs fa-sharp                                                                    
    //fa-solid fa-microscope fa-solid fa-bacterium fa-solid fa-staff-snake fa-solid fa-ear-listen fa-solid fa-eye  fa-sharp fa-solid fa-x-ray  
    // switch (id){
    //   case 3: return <i className="fa-solid fa-bone"></i>
    //   case 4: return <i className="fa-solid fa-bacterium"></i>
    //   case 5: return <i className="fa-solid fa-brain"></i>
    //   case 6: return <i className="fa-solid fa-heart-pulse"></i>
    //   case 7: return <i className="fa-solid fa-ear-listen"></i>
    //   case 8: return <i className="fa-sharp fa-solid fa-x-ray"></i>
    //   case 9: return <i className="fa-solid fa-tooth"></i>
    //   case 12: return <i className="fa-solid fa-staff-snake"></i>

    //   default: return <div></div>
    // }
    let iconName = item.iconName;
    // console.log(iconName)
    return <i className={ iconName }></i>
  } 

  render() {
    let { dataSpecialty, selectedSpecialty, selectedSpecialtyItem } = this.state;
    let sliderSetting = this.props.settings;
    let { language } = this.props;
    // console.log(dataSpecialty)

    return (
      <>
      <section id="specialty" className="specialty">
        <div className="department_area section-padding2">
          <div className="container">
            <div className="section-title">
                <h2><FormattedMessage id="homepage.specialty"/></h2>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="depart_ment_tab mb-30">
                  <ul className="nav" id="myTab" role="tablist">
                    <Slider {...this.props.settings}>
                      {dataSpecialty && dataSpecialty.length > 0 &&
                        dataSpecialty.map((item, index) => {
                          return (
                            <li className="nav-item" key={index}>
                              <a className={selectedSpecialty === item.id ? "nav-link active" : "nav-link"}
                                onClick={() => this.handleViewShortDescriptionSpecialty(item.id)} href="#" role="tab" >
                              {this.handleSetIcon(item) // lay ra specialty icon
                              }
                              <h4>{ language===LANGUAGES.VI ? item.name 
                                    : language===LANGUAGES.EN ? item.nameEn 
                                      : item.nameJp }
                              </h4>
                              </a>
                            </li>
                          )
                        })
                      }
                    </Slider>
                  </ul>
                </div>
              </div>
            </div>
            <div className="dept_main_info white-bg">
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div className="row align-items-center no-gutters">
                    <div className="col-lg-7">
                      <div className="dept_info">
                        <h3>{ language===LANGUAGES.VI ? selectedSpecialtyItem.name 
                              : language===LANGUAGES.EN ? selectedSpecialtyItem.nameEn 
                                : selectedSpecialtyItem.nameJp }
                        </h3>
                        <p>{ language===LANGUAGES.VI ? selectedSpecialtyItem.shortDescription 
                        : language===LANGUAGES.EN ? selectedSpecialtyItem.shortDescriptionEn 
                          : selectedSpecialtyItem.shortDescriptionJp }
                        </p>
                        <button onClick={() => this.handleViewDetailSpecialty(selectedSpecialtyItem)} href="#" className="dep-btn"><FormattedMessage id="homepage.view_specialty"/><i className="fa fa-arrow-right"></i></button>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="dept_thumb" style={{ background: `url(${selectedSpecialtyItem.image})` }}>
                        {/* <img src="../../assets/specialty/department_man.png" alt=""/> */}
                      </div>
                    </div>
                  </div>

                </div>


              </div>
            </div>

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
    language: state.app.language,
    userInfo: state.user.userInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeLanguageApp: (language) => dispatch(changeLanguageApp(language))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));

