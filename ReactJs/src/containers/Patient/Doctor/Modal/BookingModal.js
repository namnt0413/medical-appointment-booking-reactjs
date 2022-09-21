import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import {LANGUAGES} from '../../../../utils';
import Select from 'react-select';
// import {getScheduleDoctorByDate} from '../../../services/userService'
import { FormattedMessage} from 'react-intl'
import { Modal,Button } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
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

            isShowLoading: false
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
                object.label = language===LANGUAGES.VI ? item.valueVi : item.valueEn;
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

    handleConfirmBooking = async () => {
        // console.log('check: ',this.state);
        //validate input
        
        let date = new Date(this.state.birthday).getTime(); // convert ra date unix
        let timeString = this.buildTimeBooking(this.props.dataSchedule);
        let doctorName = this.buildDoctorName(this.props.dataSchedule);
        this.setState({
            isShowLoading: true 
        })
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
            this.setState({
                isShowLoading: false 
            })
            toast.success('Booking a new appointment success')
        } else {
            this.setState({
                isShowLoading: false 
            })
            toast.error('Booking a new appointment failed')
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
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <Modal 
                        isOpen={isOpenModal} 
                        toggle={ () => {this.toggle()} }
                        className={'booking-modal-container'}
                        size="lg" centered
                    >
                        <div className="booking-modal-content">
                            <div className="booking-modal-header">
                                <span className="left" > <FormattedMessage id="patient.booking-modal.title"/> </span>
                                <span className="right" onClick={ () => {this.toggle()} }><i className="fas fa-times"></i></span>
                            </div>

                            <div className="booking-modal-body">
                                {/* {JSON.stringify(dataSchedule)} */}
                                <div className="doctor-info">
                                    <ProfileDoctor
                                        doctorId={doctorId}
                                        isShowDescriptionDoctor={false}
                                        dataSchedule={dataSchedule}
                                        isShowLinkDetail={false}
                                        isShowPrice={true}
                                    />
                                </div>

                                <div className="row">
                                    <div className="col-6 form-group">
                                        <label className="form-label">Ho va ten</label>
                                        <input className="form-control"
                                            value={this.state.fullName}
                                            onChange={(event) => this.handleOnChangeInput(event,'fullName')  }
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label className="form-label">So dien thoai</label>
                                        <input className="form-control"
                                            value={this.state.phoneNumber}
                                            onChange={(event) => this.handleOnChangeInput(event,'phoneNumber')  }
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label className="form-label">Dia chi Email</label>
                                        <input className="form-control"
                                            value={this.state.email}
                                            onChange={(event) => this.handleOnChangeInput(event,'email')  }
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label className="form-label">Dia chi</label>
                                        <input className="form-control"
                                            value={this.state.address}
                                            onChange={(event) => this.handleOnChangeInput(event,'address')  }
                                        />
                                    </div>
                                    <div className="col-12 form-group">
                                        <label className="form-label">Ly do kham</label>
                                        <input className="form-control"
                                            value={this.state.reason}
                                            onChange={(event) => this.handleOnChangeInput(event,'reason')  }
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label className="form-label">Ngay sinh</label>
                                        <DatePicker 
                                            onChange = {this.handleOnChangeDatePicker}
                                            value={this.state.birthday}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label className="form-label">Gioi tinh</label>
                                        <Select 
                                            value={this.state.selectedGender}
                                            onChange={this.handleChangeSelect}
                                            options={this.state.genders}

                                        />
                                    </div>
                                </div>


                            </div>

                            <div className="booking-modal-footer">  
                                <button className="btn-booking-confirm btn-warning" onClick={() => this.handleConfirmBooking()} >Xac nhan</button>
                                <button className="btn-booking-cancel btn-danger" onClick={ () => {this.toggle()} }>Huy</button>
                            </div>
                        </div>
                    </Modal>
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGender: () => dispatch(actions.fetchGenderStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
