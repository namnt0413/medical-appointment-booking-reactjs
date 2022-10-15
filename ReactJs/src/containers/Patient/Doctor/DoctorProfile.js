import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorProfile.scss';
import {LANGUAGES} from '../../../utils';
import Select from 'react-select';
// import {getScheduleDoctorByDate} from '../../../services/userService'
import { FormattedMessage} from 'react-intl'
import { getDoctorProfile } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom'
require('moment/locale/ja.js');
require('moment/locale/vi.js');

class DoctorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorProfile : {}
        }
    }

    async componentDidMount() {
        let data = await this.getDoctorProfileFromService(this.props.doctorId);
        this.setState({
            doctorProfile: data
        })
        // console.log(this.state.doctorProfile)
    }

    async componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.language !== this.props.language){

        }
        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getDoctorProfileFromService(this.props.doctorId);
            this.setState({
                doctorProfile: data,
            });
          }
    }

    getDoctorProfileFromService = async (id) => {
        let result = {};
        if(id) {
            let res = await getDoctorProfile(id);
            if(res && res.errCode === 0){
                result = res.data;
            }
        }
        // console.log(result)
        return result;
    }

    renderTimeBooking = (dataSchedule) => {
        let {language} = this.props;
        // console.log(dataSchedule);
        if( dataSchedule && !_.isEmpty(dataSchedule) ){
            let time = language===LANGUAGES.VI ?
            dataSchedule.timeTypeData.valueVi : language===LANGUAGES.EN ?
            dataSchedule.timeTypeData.valueEn :
            dataSchedule.timeTypeData.valueJp;

            let date = language===LANGUAGES.VI ?
                moment.unix( +dataSchedule.date / 1000 ).format('dddd - DD/MM/YYYY')
                : language===LANGUAGES.EN ?
                moment.unix( +dataSchedule.date / 1000 ).locale('en').format('ddd - MM/DD/YYYY')
                : moment.unix( +dataSchedule.date / 1000 ).locale('ja').format('ddd - MM/DD/YYYY')
            return (
                <>
                    <div> {time} : {date} </div>
                    <div> <FormattedMessage id="patient.profile-doctor.free-booking"/> </div>

                </>
            )
        } else {
            return <></>
        }
    }

    render() {
        // console.log(this.props.match.params.id)
        let {doctorProfile } = this.state;
        let { isShowDescriptionDoctor , language ,dataSchedule ,isShowLinkDetail , isShowPrice , doctorId} = this.props
        // console.log(this.state.doctorProfile.Markdown)

        return (
        <>   
            <div className="intro-doctor">
                <div className="content-left"
                    style={{backgroundImage: `url(${doctorProfile && doctorProfile.image ? doctorProfile.image : ''})` }} 
                >
                </div>
                <div className="content-right">
                    { doctorProfile && doctorProfile.positionData && doctorProfile.positionData.valueVi && doctorProfile.positionData.valueEn && doctorProfile.positionData.valueJp
                    &&  <div className="up">
                            {language === LANGUAGES.VI ? doctorProfile.positionData.valueVi : 
                             language === LANGUAGES.EN ? doctorProfile.positionData.valueEn :
                            doctorProfile.positionData.valueJp
                            } { }
                            {doctorProfile.firstName} {doctorProfile.lastName}
                    </div>
                    }
                    { isShowDescriptionDoctor===true ?
                        <>
                            <div className="down">
                                { doctorProfile && doctorProfile.Markdown && doctorProfile.Markdown.description 
                                && <span>
                                    {   language===LANGUAGES.VI ? doctorProfile.Markdown.description : 
                                        language===LANGUAGES.EN ? doctorProfile.Markdown.descriptionEn : 
                                        doctorProfile.Markdown.descriptionJp
                                    }
                                </span>
                            }
                            </div> 
                        </>
                        :
                        <>
                          { this.renderTimeBooking(dataSchedule) }  
                        </>
                    }
                </div>
            </div>

            {isShowLinkDetail === true && 
            <div className="view-detail-doctor">
                <Link to={`/detail-doctor/${doctorId}`} ><FormattedMessage id="patient.profile-doctor.more-info"/></Link>
            </div> }

            { isShowPrice === true && 
            <div className="price">
            <FormattedMessage id="patient.profile-doctor.price"/>  
                {doctorProfile && doctorProfile.Doctor_Info && language===LANGUAGES.VI &&
                    <NumberFormat 
                        className="currency"
                        value={doctorProfile.Doctor_Info.priceTypeData.valueVi}
                        displayType="text"
                        thousandSeparator={true}
                        suffix=" VND" 
                    />  
                }
                {doctorProfile && doctorProfile.Doctor_Info && language===LANGUAGES.EN &&
                    <NumberFormat 
                        className="currency"
                        value={doctorProfile.Doctor_Info.priceTypeData.valueEn}
                        displayType="text"
                        thousandSeparator={true}
                        suffix=" $" 
                    />  
                }
                {doctorProfile && doctorProfile.Doctor_Info && language===LANGUAGES.JP &&
                    <NumberFormat 
                        className="currency"
                        value={doctorProfile.Doctor_Info.priceTypeData.valueEn}
                        displayType="text"
                        thousandSeparator={true}
                        suffix="¥" 
                    />  
                }
            </div>   
            }
        </> 
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorProfile);
