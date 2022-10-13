import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss';
import {LANGUAGES} from '../../../utils';
import Select from 'react-select';
// import {getScheduleDoctorByDate} from '../../../services/userService'
import { FormattedMessage} from 'react-intl'
import { getProfileDoctor } from '../../../services/userService';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom'

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorProfile : {}
        }
    }

    async componentDidMount() {
        let data = await this.getProfileDoctorFromService(this.props.doctorId);
        this.setState({
            doctorProfile: data
        })
    }

    async componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.language !== this.props.language){

        }
        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getProfileDoctorFromService(this.props.doctorId);
            this.setState({
                doctorProfile: data,
            });
          }
    }

    getProfileDoctorFromService = async (id) => {
        let result = {};
        if(id) {
            let res = await getProfileDoctor(id);
            if(res && res.errCode === 0){
                result = res.data;
            }
        }
        return result;
    }

    renderTimeBooking = (dataSchedule) => {
        let {language} = this.props;
        // console.log(dataSchedule);
        if( dataSchedule && !_.isEmpty(dataSchedule) ){
            let time = language===LANGUAGES.VI ?
            dataSchedule.timeTypeData.valueVi : dataSchedule.timeTypeData.valueEn;


            let date = language===LANGUAGES.VI ?
                moment.unix( +dataSchedule.date / 1000 ).format('dddd - DD/MM/YYYY')
            :   moment.unix( +dataSchedule.date / 1000 ).locale('en').format('ddd - MM/DD/YYYY') 
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
        // console.log(this.state.doctorProfile)

        return (
        <>   
            <div className="intro-doctor">
                <div className="content-left"
                    style={{backgroundImage: `url(${doctorProfile && doctorProfile.image ? doctorProfile.image : ''})` }} 
                >
                </div>
                <div className="content-right">
                    { doctorProfile && doctorProfile.positionData && doctorProfile.positionData.valueVi && doctorProfile.positionData.valueEn
                    &&  <div className="up">
                            {language === LANGUAGES.VI ? doctorProfile.positionData.valueVi : doctorProfile.positionData.valueEn } { }
                            {doctorProfile.firstName} {doctorProfile.lastName}
                    </div>
                    }
                    { isShowDescriptionDoctor===true ?
                        <>
                            {<div className="down">
                                { doctorProfile && doctorProfile.Markdown && doctorProfile.Markdown.description
                                && <span>
                                    {doctorProfile.Markdown.description}
                                </span>
                            }
                            </div> }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
