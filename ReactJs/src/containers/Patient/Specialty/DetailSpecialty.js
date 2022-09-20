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
import {getDetailSpecialtyById , getAllCodeService} from '../../../services/userService'
import _ from 'lodash';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctor :[],
            dataDetailSpecialty : {},
            listProvince: []
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id ){
            let id = this.props.match.params.id;
            let res = await getDetailSpecialtyById({
                id: id,
                location: 'ALL'
            })

            let resProvince = await getAllCodeService('PROVINCE')

            if( res && res.errCode === 0 && resProvince && resProvince.errCode === 0 ){
                let data = res.data;
                let arrDoctor = [];
                if( data && !_.isEmpty(res.data) ){
                    let arr = data.doctorSpecialty;
                    if(arr && arr.length > 0){
                        arr.map(item =>{
                            arrDoctor.push(item.doctorId);

                        })
                    }
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctor: arrDoctor,
                    listProvince: resProvince.data
                })
            }
             
        }
    }

    async componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.language !== this.props.language){

        }
    }

    handleOnChangeSelect = (event) => {
        console.log('check select: ' , event.target.value)
    }

    render() {
        // console.log(this.props.match.params.id)
        // console.log(this.state)
        let {arrDoctor , dataDetailSpecialty, listProvince } = this.state
        let language = this.props.language;


        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="detail-specialty-body"> 
                    <div className="specialty-description">
                        { dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && //chuyen ve dang html
                            <div dangerouslySetInnerHTML={{__html: dataDetailSpecialty.descriptionHTML }}></div>
                        } 
                    </div>
                    <div className="search-location-doctor">
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                        { listProvince && listProvince.length > 0 &&
                            listProvince.map((item,index) => {
                                return ( 
                                    <option key={index} value={item.keyMap} >
                                        { language === LANGUAGES.VI ? item.valueVi : item.valueEn } 
                                    </option>
                                )
                            })
                        }
                        </select>
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
