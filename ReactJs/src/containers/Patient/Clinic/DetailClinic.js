import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailClinic.scss';
import './DetailClinic.css';
import { LANGUAGES } from '../../../utils';
import Select from 'react-select';
// import {getScheduleDoctorByDate} from '../../../services/userService'
import { FormattedMessage } from 'react-intl'
import HomeHeader from '../../HomePage/HomeHeader'
import HomeFooter from '../../HomePage/HomeFooter'
import DoctorSchedule from '../Doctor/DoctorSchedule'
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo'
import ProfileDoctor from '../Doctor/ProfileDoctor'
import { getDetailClinicyById, getAllCodeService } from '../../../services/userService'
import _ from 'lodash';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: [],
            dataDetailClinic: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailClinicyById({
                id: id
            })

            if (res && res.errCode === 0) {
                let doctorClinic = res.doctorClinic;
                let arrDoctor = [];
                if (doctorClinic && !_.isEmpty(res.doctorClinic)) {
                    let arr = doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctor.push(item.doctorId);

                        })
                    }
                }
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctor: arrDoctor,
                })
            }

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    render() {
        // console.log(this.props)
        console.log(this.state)
        let { arrDoctor, dataDetailClinic, listProvince } = this.state
        let language = this.props.language;


        return (
            <>
                <HomeHeader />
                <section id="clinics" className="clinics">
                    <div className="container">
                        <div className="row clinics-background-image" style={{ background: `url(${this.state.dataDetailClinic.image})` }}>
                        </div>

                        <div className='row'>
                            <div className="col-lg-12 mt-4 mt-lg-0 clinic-short-description">
                                <div className="row clinic-name">{dataDetailClinic.name}</div>
                            </div>
                            <div className="col-lg-12 mt-4 mt-lg-0 clinic-short-description">
                                <div className="row clinic-address"><i class="fa fa-map-marker"/>{dataDetailClinic.address}
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-lg-12 mt-4 mt-lg-0 clinic-content">
                                <div className="clinic-gt"><FormattedMessage id="patient.detail-clinic.intro"/></div>
                                {dataDetailClinic && !_.isEmpty(dataDetailClinic) && //chuyen ve dang html
                                    <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}></div>
                                }
                            </div>
                        </div>

                        <div className="clinic-booking"><FormattedMessage id="patient.detail-clinic.book-appointment"/></div>
                        {arrDoctor && arrDoctor.length > 0 &&
                            arrDoctor.map((item, index) => {
                                return (
                                    <div className="row clinic-doctor">
                                        <div className="col-lg-6 mt-4 mt-lg-0 doctor-content-left">
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            // dataSchedule={dataSchedule}
                                            />
                                        </div>

                                        <div className="col-lg-6 mt-4 mt-lg-0 doctor-content-right">
                                            <div className="row">
                                                <DoctorSchedule
                                                    detailDoctorFromParent={item}
                                                />
                                            </div>
                                            <div className="row doctor-extra-info" >
                                                <DoctorExtraInfo
                                                    doctorIdFromParent={item}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>



                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
