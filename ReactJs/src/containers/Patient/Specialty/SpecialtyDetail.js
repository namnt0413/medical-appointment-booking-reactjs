import React, { Component } from 'react';
import { connect } from "react-redux";
import './SpecialtyDetail.scss';
import './SpecialtyDetail.css';
import { LANGUAGES } from '../../../utils';
import Select from 'react-select';
// import {getScheduleDoctorByDate} from '../../../services/userService'
import { FormattedMessage } from 'react-intl'
import HomeHeader from '../../HomePage/HomeHeader'
import HomeFooter from '../../HomePage/HomeFooter'
import DoctorSchedule from '../Doctor/DoctorSchedule'
import DoctorMoreInfo from '../Doctor/DoctorMoreInfo'
import DoctorProfile from '../Doctor/DoctorProfile'
import { getSpecialtyDetailById, getAllCodeService } from '../../../services/userService'
import _ from 'lodash';
import * as actions from '../../../store/actions'


class SpecialtyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: [],
            dataSpecialtyDetail: {},
            listProvince: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.props.changeIsShowLoading(true);  // loading

            let res = await getSpecialtyDetailById({
                id: id,
                location: 'ALL'
            })
            // console.log(res.data);
            let resProvince = await getAllCodeService("PROVINCE")
            console.log(resProvince)

            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                this.props.changeIsShowLoading(false);  // not loading

                let doctorSpecialty = res.doctorSpecialty;
                let arrDoctor = [];
                if (doctorSpecialty && !_.isEmpty(res.doctorSpecialty)) {
                    let arr = doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctor.push(item.doctorId);

                        })
                    }
                }
                let dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueEn: 'All',
                        valueVi: 'Toàn quốc',
                        valueJp: '全国',
                    })
                }
                this.setState({
                    dataSpecialtyDetail: res.data,
                    arrDoctor: arrDoctor,
                    listProvince: dataProvince
                })
            }

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;

            this.props.changeIsShowLoading(true);  // loading
            let res = await getSpecialtyDetailById({
                id: id,
                location: location
            })

            if (res && res.errCode === 0) {
                this.props.changeIsShowLoading(false);  // loading

                let doctorSpecialty = res.doctorSpecialty;
                let arrDoctor = [];
                if (doctorSpecialty && !_.isEmpty(res.doctorSpecialty)) {
                    let arr = doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctor.push(item.doctorId);

                        })
                    }
                }
                // console.log('check select: ' , event.target.value ,'arr doctor : ', arrDoctor)

                this.setState({
                    dataSpecialtyDetail: res.data,
                    arrDoctor: arrDoctor,
                })
            }
        }
    }

    render() {
        // console.log(this.props)
        console.log(this.state.listProvince)
        let { arrDoctor, dataSpecialtyDetail, listProvince } = this.state
        let language = this.props.language;


        return (
            <>
                <HomeHeader />
                <section id="detailSpecialty" className="detailSpecialty">
                    <div className="container">
                        <div className="row detail-specialty-background-image" style = {{background: `url(${this.state.dataSpecialtyDetail.image})` }}>
                            <div className="col-lg-12 mt-4 mt-lg-0 detail-specialty-description">
                                {dataSpecialtyDetail && !_.isEmpty(dataSpecialtyDetail) && //chuyen ve dang html
                                    language===LANGUAGES.VI ?
                                    <div dangerouslySetInnerHTML={{ __html: dataSpecialtyDetail.descriptionHTML }}></div>
                                    : language===LANGUAGES.EN ?
                                    <div dangerouslySetInnerHTML={{ __html: dataSpecialtyDetail.descriptionHTMLEn }}></div>
                                    : 
                                    <div dangerouslySetInnerHTML={{ __html: dataSpecialtyDetail.descriptionHTMLJp }}></div>
                                }
                            </div>
                        </div>

                        <div className="row">
                            <div className="search-location-doctor">
                                <select onChange={(event) => this.handleOnChangeSelect(event)}>
                                    {listProvince && listProvince.length > 0 &&
                                        listProvince.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap} >
                                                    {language === LANGUAGES.VI ? item.valueVi : language === LANGUAGES.EN ? item.valueEn : item.valueJp }
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        {arrDoctor && arrDoctor.length > 0 &&
                            arrDoctor.map((item, index) => {
                                return (
                                    <div className="row specialty-doctor">
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetail);
