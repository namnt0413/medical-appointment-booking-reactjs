import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import {getDetailInfoDoctor} from '../../../services/userService';
import {LANGUAGES} from '../../../utils';
import Select from 'react-select';
import moment from 'moment';
import localization from 'moment/locale/vi'
import {getScheduleDoctorByDate} from '../../../services/userService'

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDay: [],
        }
    }

    async componentDidMount() {
        let {language} = this.props;

       this.setArrDay(language);

    }

    componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.language !== this.props.language){
            this.setArrDay(this.props.language);
        }
    }

    setArrDay = (language) => {
        let arrDay = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if(language === LANGUAGES.VI ){
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM'); // format ngay TV, add them ... ngay theo vong for
            }
            else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format("ddd - DD/MM"); // format ngay TV, add them ... ngay theo vong for    
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf(); // startOf day de lay gio =0, valueof de lay kieu unix tim
            arrDay.push(object);
        }
        // console.log(arrDay);
        this.setState({
            arrDay: arrDay
        })
    }

    handleOnChangSelect = async (event) => {
        if(this.props.detailDoctorFromParent && this.props.detailDoctorFromParent!== -1 ){
            let doctorId = this.props.detailDoctorFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId,date);
            console.log(res);
        }
    }

    render() {
        // console.log(this.props.match.params.id)
        let language = this.props.language;
        let {arrDay} = this.state;
        
        return (
            <div className="doctor-schedule-container">
                <div className="all-schedule">
                    <select 
                        onChange={(event) => this.handleOnChangSelect(event)}
                    >
                        {arrDay && arrDay.length > 0 && 
                            arrDay.map((item,index)=> {
                                return ( 
                                    <option 
                                    value={item.value} key={index}> 
                                    {item.label}
                                    </option>
                                )
                            })
                        }
                    </select>
                    {/* <Select
                        options={arrDay}
                        onChange={(event) => this.handleOnChangSelect(event)}
                    /> */}

                </div>
                <div className="all-avaiable-time">

                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
