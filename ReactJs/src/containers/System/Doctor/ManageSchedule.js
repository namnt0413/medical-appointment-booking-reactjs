import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import { LANGUAGES , CRUD_ACTIONS, CommonUtils } from '../../../utils'
import './ManageSchedule.scss';
import { FormattedDate, FormattedMessage} from 'react-intl'
import Select from 'react-select';
import * as actions from "../../../store/actions"
import DatePicker from "../../../components/Input/DatePicker"
import moment from "moment"
// import FormmatedDate from "../../../components/Formating/FormattedDate";

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: new Date(),
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.FetchAllScheduleTime();
    }

    componentDidUpdate(prevProps,prevState, snapshot) {
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
            this.setState({
                rangeTime: this.props.allScheduleTime
            })
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if( inputData && inputData.length > 0 ) {
            inputData.map((item, index) => {
                // console.log(item)
                let object = {};
                let labelVi = `${item.firstName} ${item.lastName}`
                let labelEn = `${item.lastName} ${item.firstName}`
                object.label = language===LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id
                result.push(object);
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

    render() {
        const { isLoggedIn } = this.props;
        // console.log(this.state);
        let { rangeTime } = this.state ;
        let {language} = this.props;

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
                                    minDate={new Date()}
                                    value={this.state.currentDate}
                                    // value={this.state.currentDate}
                                    className="form-control"

                                />
                            </div>
                            <div className="col-12 pick-hour-container">
                                {rangeTime && rangeTime.length > 0 &&
                                    rangeTime.map( (item,index) => {
                                        return (
                                            <button type="btn btn-schedule" key={index} >
                                                { language === LANGUAGES.VI ? item.valueVi : item.valueEn } 
                                            </button> 
                                        )
                                    })
                                }
                            </div>
                            <div className="col-12">
                                <button className="btn-primary btn-save-schedule"><FormattedMessage id="manage-schedule.save-info" /></button>
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
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors() ),
        FetchAllScheduleTime: () => dispatch(actions.FetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
