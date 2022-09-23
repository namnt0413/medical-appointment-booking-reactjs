import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailClinic.scss';
import {LANGUAGES} from '../../../utils';
import Select from 'react-select';
// import {getScheduleDoctorByDate} from '../../../services/userService'
import { FormattedMessage} from 'react-intl'
import HomeHeader from '../../HomePage/HomeHeader'
import HomeFooter from '../../HomePage/HomeFooter'
import DoctorSchedule from '../Doctor/DoctorSchedule'
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo'
import ProfileDoctor from '../Doctor/ProfileDoctor'
import {getDetailClinicyById , getAllCodeService} from '../../../services/userService'
import _ from 'lodash';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctor :[],
            dataDetailClinic : {},
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id ){
            let id = this.props.match.params.id;
            let res = await getDetailClinicyById({
                id: id
            })
           
            if( res && res.errCode === 0  ){
                let doctorClinic = res.doctorClinic;
                let arrDoctor = [];
                if( doctorClinic && !_.isEmpty(res.doctorClinic) ){
                    let arr = doctorClinic;
                    if(arr && arr.length > 0){
                        arr.map(item =>{
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

    async componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.language !== this.props.language){

        }
    }

    render() {
        // console.log(this.props)
        console.log(this.state)
        let {arrDoctor , dataDetailClinic, listProvince } = this.state
        let language = this.props.language;


        return (
            <div className="detail-clinic-container">
                <HomeHeader />
                <div className="detail-clinic-background-image" style = {{background: `url(${this.state.dataDetailClinic.image})` }} ></div>

                <div className="detail-clinic-description">
                    <div className="detail-clinic-description-body">
                        { dataDetailClinic && !_.isEmpty(dataDetailClinic) && //chuyen ve dang html
                            <>
                                <div className="clinic-name">{dataDetailClinic.name}</div>
                                <div className="clinic-address"><i className="fa fa-map-marker" aria-hidden="true"></i> {dataDetailClinic.address}</div>
                                <div className="clinic-gt">Giới thiệu</div>
                                <div className="clinic-content" dangerouslySetInnerHTML={{__html: dataDetailClinic.descriptionHTML }}></div>
                            </>
                        } 
                    </div>
                </div>
                
                <div className="detail-clinic-body"> 
                    <div className="clinic-booking">Đặt lịch khám</div>
                    { arrDoctor && arrDoctor.length > 0 &&
                        arrDoctor.map( (item,index) => {
                        return (
                    <div className="clinic-doctor" key={index} >
                        <div className="doctor-content-left">
                            <div className="profile-doctor">
                                <ProfileDoctor 
                                    doctorId={item}
                                    isShowDescriptionDoctor={true}
                                    isShowLinkDetail={true}
                                    isShowPrice={false}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
