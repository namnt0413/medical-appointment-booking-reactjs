import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES , CRUD_ACTIONS, CommonUtils, dateFormat } from '../../../utils'
import './ManageSchedule.scss';
import { FormattedMessage} from 'react-intl'
import Select from 'react-select';
import * as actions from "../../../store/actions"
import DatePicker from "../../../components/Input/DatePicker"
import moment from "moment"
// import FormmatedDate from "../../../components/Formating/FormattedDate";
import { toast } from 'react-toastify';
import _ from 'lodash';
import { bulkCreateSchedule ,getScheduleDoctorByDate} from '../../../services/userService'

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: moment(new Date()).add(0, 'days').startOf('day').valueOf() ,
            userInfo: this.props.userInfo
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.FetchAllScheduleTime();
        
    }

    async componentDidUpdate(prevProps,prevState, snapshot) {
        if( prevProps.allDoctors !== this.props.allDoctors ){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if( prevProps.language !== this.props.language){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if( prevProps.allScheduleTime !== this.props.allScheduleTime){
            let data = this.props.allScheduleTime;
            // console.log(data)
            if( data && data.length > 0 ){
                // data.map( item => {
                //     item.isSelected = false;
                //     return item;
                // })
                data = data.map( item =>({ ...item, isSelected: false }));
            }
            // console.log(data);
            this.setState({
                rangeTime: data
            })
        }
        if( prevState.selectedDoctor !== this.state.selectedDoctor ){
            let data = this.props.allScheduleTime;
            if( data && data.length > 0 ){
                data = data.map( item =>({ ...item, isSelected: false }));
            }
            this.setState({
                rangeTime: data
            })

            // console.log(this.state.selectedDoctor ,formatedDate )
            let doctorId = this.state.selectedDoctor.value;
            let formatedDate = new Date(this.state.currentDate).getTime();
            let res = await getScheduleDoctorByDate(doctorId,formatedDate);
            let selectedDate = res.data
            let {rangeTime} = this.state
            // console.log(selectedDate,rangeTime)

            if( selectedDate && selectedDate.length > 0){ // loop selectedDate va rangeTime, neu trung thoi gian thi set isSelected true
                selectedDate = selectedDate.map( time => {
                    if( rangeTime && rangeTime.length > 0 ) {
                        rangeTime = rangeTime.map( item => {
                            if( item.keyMap === time.timeType ) item.isSelected=true;
                            // else item.isSelected=false;
                            return item;
                        })
                    }
                })
            }
            console.log(rangeTime)
            this.setState({
                rangeTime: rangeTime
            })
        }
        if ( prevState.currentDate !== this.state.currentDate ){
            let data = this.props.allScheduleTime;
            if( data && data.length > 0 ){
                data = data.map( item =>({ ...item, isSelected: false }));
            }
            this.setState({
                rangeTime: data
            })

            // console.log(this.state.selectedDoctor ,this.state.currentDate )
            let doctorId = this.state.selectedDoctor.value;
            let formatedDate = new Date(this.state.currentDate).getTime();
            let res = await getScheduleDoctorByDate(doctorId,formatedDate);
            let selectedDate = res.data
            let {rangeTime} = this.state
            // console.log(selectedDate,rangeTime)

            if( selectedDate && selectedDate.length > 0){ // loop selectedDate va rangeTime, neu trung thoi gian thi set isSelected true
                selectedDate = selectedDate.map( time => {
                    if( rangeTime && rangeTime.length > 0 ) {
                        rangeTime = rangeTime.map( item => {
                            if( item.keyMap === time.timeType ) item.isSelected=true;
                            return item;
                        })
                    }
                })
            }
            console.log(rangeTime)
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if( inputData && inputData.length > 0 ) {
            inputData.map((item, index) => {
                if( item.id === this.state.userInfo.id ){
                    // console.log(item)
                    let object = {};
                    let labelVi = `${item.firstName} ${item.lastName}`
                    let labelEn = `${item.lastName} ${item.firstName}`
                    object.label = language===LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id
                    result.push(object);
                }
            })
        }
        return result;
    }

    handleChangeSelect = async (selectedOption) => { // react-select
        this.setState({ selectedDoctor: selectedOption }
        );
    };
    
    handleOnChangeDatePicker = (date) => {
        this.setState({ 
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let {rangeTime} = this.state;
        console.log('check time clicked: ', time , rangeTime)
        if( rangeTime && rangeTime.length > 0 ) {
            rangeTime = rangeTime.map( item => {
                if( item.id === time.id ) item.isSelected=!item.isSelected;
                return item;
            })
        }
        this.setState({rangeTime: rangeTime});
        console.log(rangeTime);
    }

    handleSaveSchedule = async () => {
        let {rangeTime, selectedDoctor, currentDate} = this.state;
        let result = [];
        // console.log(rangeTime,selectedDoctor,currentDate);
        if(!currentDate) {
            toast.error("Invalid date");
            return;
        }
        if(selectedDoctor && _.isEmpty(selectedDoctor)){
            toast.error("Please select a doctor");
            return;
        }
        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        // currentDate = currentDate[0]
        let formatedDate = new Date(currentDate).getTime(); //format ve dang timestamp de luu vao db

        if( rangeTime && rangeTime.length > 0){
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            // console.log(selectedTime);
            if( selectedTime && selectedTime.length > 0){

                // XU LY PUSH OBJECT DATA VAO HET 1 MANG
                selectedTime.map(item => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = item.keyMap;
                    result.push(object);
                })

            } else {
                toast.error("Please select a time");
                return;
            }
        }

        let res = await bulkCreateSchedule({
            arrSchedule : result,
            doctorId: selectedDoctor.value, 
            date: formatedDate
        });
        if(res && res.errCode === 0){
            toast.success("Dat lich thanh cong");
            let {rangeTime} = this.state;
            if( rangeTime && rangeTime.length > 0 ) {
                rangeTime = rangeTime.map( item => {
                    item.isSelected=false;
                    return item;
                })
            }
            // console.log(rangeTime);
            this.setState({
                rangeTime: rangeTime,
                selectedDoctor: {}
            });
        }
        // console.log('check result : ', res);

    }

    render() {
        const { isLoggedIn , userInfo } = this.props;
        // console.log(this.props);

        let { rangeTime } = this.state ;
        let {language} = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));

        return (
            <React.Fragment>
                <div className="manage-schedule-container">
                    <div className="m-s-title title">
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label className=""><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label className=""><FormattedMessage id="manage-schedule.choose-date" /></label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    minDate={ yesterday }
                                    value={this.state.currentDate}
                                    // value={this.state.currentDate}
                                    className="form-control"
                                />
                            </div>
                            <div className="col-12 pick-hour-container">
                                {rangeTime && rangeTime.length > 0 &&
                                    rangeTime.map( (item,index) => {
                                        return (
                                            <button 
                                                className={item.isSelected===true ? 'btn btn-schedule active' : 'btn btn-schedule' } 
                                                key={index} 
                                                onClick={() => this.handleClickBtnTime(item) }
                                            >
                                                { language === LANGUAGES.VI ? item.valueVi : item.valueEn } 
                                            </button> 
                                        )
                                    })
                                }
                            </div>
                            <div className="col-12">
                                <button className="btn-primary btn-save-schedule"
                                    onClick={() => this.handleSaveSchedule()}

                                ><FormattedMessage id="manage-schedule.save-info" /></button>
                            </div>
                        </div>
                    </div>
                
                
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors() ),
        FetchAllScheduleTime: () => dispatch(actions.FetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
