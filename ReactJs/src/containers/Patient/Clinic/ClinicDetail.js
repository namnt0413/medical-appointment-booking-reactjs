import React, { Component } from 'react';
import { connect } from "react-redux";
import './ClinicDetail.scss';
import './ClinicDetail.css';
import { LANGUAGES } from '../../../utils';
import Select from 'react-select';
// import {getScheduleDoctorByDate} from '../../../services/userService'
import { FormattedMessage } from 'react-intl'
import HomeHeader from '../../HomePage/HomeHeader'
import HomeFooter from '../../HomePage/HomeFooter'
import DoctorSchedule from '../Doctor/DoctorSchedule'
import DoctorMoreInfo from '../Doctor/DoctorMoreInfo'
import DoctorProfile from '../Doctor/DoctorProfile'
import { getClinicDetailyById, getAllCodeService } from '../../../services/userService'
import _ from 'lodash';
import * as actions from '../../../store/actions'

class ClinicDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: [],
            dataClinicDetail: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            this.props.changeIsShowLoading(true);  // loading
            let res = await getClinicDetailyById({
                id: id
            })

            if (res && res.errCode === 0) {
                this.props.changeIsShowLoading(false);  // not loading
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
                    dataClinicDetail: res.data,
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
        // console.log(this.state)
        let { arrDoctor, dataClinicDetail, listProvince } = this.state
        let language = this.props.language;


        return (
            <>
                <HomeHeader />
                <section id="clinics" className="clinics">
                    <div className="container">
                        <div className="row clinics-background-image" style={{ background: `url(${this.state.dataClinicDetail.image})` }}>
                        </div>

                        <div className='row'>
                            <div className="col-lg-12 mt-4 mt-lg-0 clinic-short-description">
                                <div className="row clinic-name">
                                    {language===LANGUAGES.VI ? dataClinicDetail.name :
                                    language===LANGUAGES.EN ? dataClinicDetail.nameEn :
                                    dataClinicDetail.nameJp}
                                </div>
                            </div>
                            <div className="col-lg-12 mt-4 mt-lg-0 clinic-short-description">
                                <div className="row clinic-address">
                                    {language===LANGUAGES.VI ? dataClinicDetail.address :
                                    language===LANGUAGES.EN ? dataClinicDetail.addressEn :
                                    dataClinicDetail.addressJp}
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-lg-12 mt-4 mt-lg-0 clinic-content">
                                <div className="clinic-gt"><FormattedMessage id="patient.detail-clinic.intro"/></div>
                                {dataClinicDetail && !_.isEmpty(dataClinicDetail) && //chuyen ve dang html
                                    language===LANGUAGES.VI ?
                                    <div dangerouslySetInnerHTML={{ __html: dataClinicDetail.descriptionHTML }}></div>
                                    : language===LANGUAGES.EN ?
                                    <div dangerouslySetInnerHTML={{ __html: dataClinicDetail.descriptionHTMLEn }}></div>
                                    : 
                                    <div dangerouslySetInnerHTML={{ __html: dataClinicDetail.descriptionHTMLJp }}></div>
                                }
                            </div>
                        </div>

                        <div className="clinic-booking"><FormattedMessage id="patient.detail-clinic.book-appointment"/></div>
                        {arrDoctor && arrDoctor.length > 0 &&
                            arrDoctor.map((item, index) => {
                                return (
                                    <div className="row clinic-doctor">
                                        <div className="col-lg-6 mt-4 mt-lg-0 doctor-content-left">
                                            <DoctorProfile
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
                                                <DoctorMoreInfo
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
        language: state.app.language,
        isShowLoading: state.app.isShowLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeIsShowLoading: (isShowLoading) => dispatch(actions.changeIsShowLoading(isShowLoading))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClinicDetail);
