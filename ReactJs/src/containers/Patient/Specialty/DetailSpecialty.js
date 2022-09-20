import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailSpecialty.scss';
import {LANGUAGES} from '../../../utils';
import Select from 'react-select';
// import {getScheduleDoctorByDate} from '../../../services/userService'
import { FormattedMessage} from 'react-intl'
import HomeHeader from '../../HomePage/HomeHeader'
import HomeFooter from '../../HomePage/HomeFooter'
import DoctorSchedule from '../Doctor/DoctorSchedule'
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo'
import ProfileDoctor from '../Doctor/ProfileDoctor'

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctor :[32,37]
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.language !== this.props.language){

        }
    }

    render() {
        // console.log(this.props.match.params.id)
    let {arrDoctor , language } = this.state

        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="detail-specialty-body">
                    <div className="specialty-description">
                    </div>

                    { arrDoctor && arrDoctor.length > 0 &&
                        arrDoctor.map( (item,index) => {
                        return (
                    <div className="specialty-doctor" key={index} >
                        <div className="doctor-content-left">
                            <div className="profile-doctor">
                                <ProfileDoctor 
                                    doctorId={item}
                                    isShowDescriptionDoctor={true}
                                    // dataSchedule={dataSchedule}
                                />
                            </div>
                        </div>
                        <div className="doctor-content-right">
                            <div className="doctor-schedule">
                                 <DoctorSchedule
                                    detailDoctorFromParent = {item}
                                />
                            </div>
                            <div className="doctor-extra-info">
                                <DoctorExtraInfo
                                    doctorIdFromParent = {item}
                                />
                            </div>
                        </div>
                    </div>
                        )
                        })
                    }
                </div>




                <HomeFooter />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
