import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import {LANGUAGES} from '../../../../utils';
import Select from 'react-select';
// import {getScheduleDoctorByDate} from '../../../services/userService'
import { FormattedMessage} from 'react-intl'
import { Modal,Button } from 'reactstrap';
import DoctorProfile from '../DoctorProfile';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker'
import * as actions from '../../../../store/actions'
import {postBookingAppointment} from '../../../../services/userService'
import { toast } from 'react-toastify';
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';


class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            doctorId: '',
            selectedGender: '',
            timeType: '',

            genders: '',
            doctorProfile : {},
        }
    }

    async componentDidMount() {
        this.props.getGender();
    }

    async componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.language !== this.props.language){
            this.setState({
                genders: this.buildDataGenders(this.props.genders)
            })
        }
        if( prevProps.genders !== this.props.genders ){
            this.setState({
                genders: this.buildDataGenders(this.props.genders)
            })
        }
        if( prevProps.dataSchedule !== this.props.dataSchedule ){
            if( this.props.dataSchedule && !_.isEmpty(this.props.dataSchedule) ){
                let doctorId = this.props.dataSchedule.doctorId;
                let timeType = this.props.dataSchedule.timeType;
                this.setState({ 
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }


    buildDataGenders = (data) => {
        let result = [];
        let {language} = this.props;

        if(data && data.length > 0 ){
            data.map(item => {
                let object = {};
                object.label = language===LANGUAGES.VI ? item.valueVi : language===LANGUAGES.EN ? item.valueEn : item.valueJp ;
                object.value = item.keyMap
                result.push(object);
            })
        }
        return result;
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event,id) => {
        let valueInput = event.target.value;
        let stateCopy = {...this.state};
        stateCopy[id] = valueInput; 
        this.setState({
            ...stateCopy,
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }

    buildTimeBooking = (dataSchedule) => {
        let {language} = this.props;
        // console.log(dataSchedule);
        if( dataSchedule && !_.isEmpty(dataSchedule) ){
            let time = language===LANGUAGES.VI ?
            dataSchedule.timeTypeData.valueVi : dataSchedule.timeTypeData.valueEn;

            let date = language===LANGUAGES.VI ?
                moment.unix( +dataSchedule.date / 1000 ).format('dddd - DD/MM/YYYY')
            :   moment.unix( +dataSchedule.date / 1000 ).locale('en').format('ddd - MM/DD/YYYY') 
            return  `${time} : ${date}` 
        }
        return ``;
    }

    buildDoctorName = (dataSchedule) => {
        let {language} = this.props;
        // console.log(dataSchedule);
        if( dataSchedule && !_.isEmpty(dataSchedule) ){
            let name = language===LANGUAGES.VI ?
                `${dataSchedule.doctorData.firstName} ${dataSchedule.doctorData.lastName}` :
                `${dataSchedule.doctorData.lastName} ${dataSchedule.doctorData.firstName}`;


            return  name;
        }
        return ``;
    }

    // changeIsShowLoading = (isShowLoading) => {
    //     this.props.changeIsShowLoading(isShowLoading)
    // }

    handleConfirmBooking = async () => {
        // console.log('check: ',this.state);
        //validate input
        
        let date = new Date(this.state.birthday).getTime(); // convert ra date unix
        let timeString = this.buildTimeBooking(this.props.dataSchedule);
        let doctorName = this.buildDoctorName(this.props.dataSchedule);
        this.props.changeIsShowLoading(true);  // loading
        
        let res = await postBookingAppointment({
            doctorId: this.state.doctorId,
            email: this.state.email,
            date: this.props.dataSchedule.date,
            birthday: date,
            timeType: this.state.timeType,
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            reason: this.state.reason,
            selectedGender: this.state.selectedGender.value,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
            nameClinic: this.props.dataSchedule.doctorData.Doctor_Info.nameClinic,
            addressClinic: this.props.dataSchedule.doctorData.Doctor_Info.addressClinic,
        })
        // console.log(res)

        if(res && res.errCode === 0){
            this.toggle();
            this.props.changeIsShowLoading(false);
            toast.success(<FormattedMessage id="patient.booking-modal.book-success"/>)
        } else {
            this.props.changeIsShowLoading(false);
            toast.error(<FormattedMessage id="patient.booking-modal.book-fail"/>)
        }

    }


    render() {
        // console.log(this.props)
        let doctorId = '';
        let language = this.props.language;
        let { isOpenModal , dataSchedule } = this.props;

        if( dataSchedule && !_.isEmpty(dataSchedule) ){
            doctorId = dataSchedule.doctorId;
        }

        return (
            <>
                <Modal 
                    isOpen={isOpenModal} 
                    toggle={ () => {this.toggle()} }
                    className={'booking-modal-container'}
                    size="lg" centered
                >
                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <div className="section-title">
                                <h2><FormattedMessage id="patient.booking-modal.title"/>
                                    <span className="right" onClick={ () => {this.toggle()} }><i className="fas fa-times"></i></span>
                                </h2>
                            </div>
                        </div>
                        <div className="booking-modal-body">
                            {/* {JSON.stringify(dataSchedule)} */}
                            <div className="doctor-info">
                                <DoctorProfile
                                    doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataSchedule={dataSchedule}
                                    isShowLinkDetail={false}
                                    isShowPrice={true}
                                />
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label className="form-label"><FormattedMessage id="patient.booking-modal.name"/></label>
                                    <input className="form-control"
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleOnChangeInput(event,'fullName')  }
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label className="form-label"><FormattedMessage id="patient.booking-modal.phone-number"/></label>
                                    <input className="form-control"
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnChangeInput(event,'phoneNumber')  }
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label className="form-label"><FormattedMessage id="patient.booking-modal.email"/></label>
                                    <input className="form-control"
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnChangeInput(event,'email')  }
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label className="form-label"><FormattedMessage id="patient.booking-modal.address"/></label>
                                    <input className="form-control"
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnChangeInput(event,'address')  }
                                    />
                                </div>
                                <div className="col-12 form-group">
                                    <label className="form-label"><FormattedMessage id="patient.booking-modal.reason"/></label>
                                    <input className="form-control"
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnChangeInput(event,'reason')  }
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label className="form-label"><FormattedMessage id="patient.booking-modal.birthday"/></label>
                                    <DatePicker 
                                        onChange = {this.handleOnChangeDatePicker}
                                        value={this.state.birthday}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label className="form-label"><FormattedMessage id="patient.booking-modal.gender"/></label>
                                    <Select 
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">  
                            <button className="confirm" onClick={() => this.handleConfirmBooking()} ><FormattedMessage id="patient.booking-modal.btn-confirm"/></button>
                            <button className="cancel" onClick={ () => {this.toggle()} }><FormattedMessage id="patient.booking-modal.btn-cancel"/></button>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isShowLoading: state.app.isShowLoading,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGender: () => dispatch(actions.fetchGenderStart()),
        changeIsShowLoading: (isShowLoading) => dispatch(actions.changeIsShowLoading(isShowLoading))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
