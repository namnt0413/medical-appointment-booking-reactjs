import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import {LANGUAGES} from '../../../utils';
import Select from 'react-select';
// import {getScheduleDoctorByDate} from '../../../services/userService'
import { FormattedMessage} from 'react-intl'
import DatePicker from '../../../components/Input/DatePicker';
import {getListPatient} from '../../../services/doctorService'
import moment from 'moment';


class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
        }
    }

    async componentDidMount() {
        let {user} = this.props;
        let {currentDate} = this.state;
        let formatedDate = new Date(currentDate).getTime() ;
        this.getDataPatient(user,formatedDate);
        
    }
    
    getDataPatient = async (user,formatedDate) => { 
        let res = await getListPatient({
            doctorId: user.id,
            date: formatedDate
        })
        // console.log('check' , res);
        if(res && res.errCode === 0 ){
            this.setState({
                dataPatient: res.data
            })
        }
    }

    async componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.language !== this.props.language){

        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({ 
            currentDate: date[0]
        },()=> {
            let {user} = this.props;
            let {currentDate} = this.state;
            let formatedDate = new Date(currentDate).getTime() ;
            this.getDataPatient(user,formatedDate);
        })
    }

    handleBtnConfirm = () => {}
    handleBtnSendEmail = () => {}

    render() {
        // console.log('check state: ',  this.state)
        // console.log('check props: ',  this.props)

        let language = this.props.language;
        let {dataPatient} = this.state;

        return (
            <div className="manage-patient-container">
                <div className="manage-patient-title title">
                    Quản lý bệnh nhân khám bệnh
                </div>
                <div className="manage-patient-body row">
                    <div className="col-4 form-group">
                        <label>Chon ngay kkham</label>
                        <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            value={this.state.currentDate}
                            // value={this.state.currentDate}
                            className="form-control"
                        />
                    </div>
                    <div className="col-12 form-group table-manage-patient">
                        <table id="TableManagePatient"> 
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th>Thời gian</th>
                                    <th>Họ và tên ( Email )</th>
                                    <th>Giới tính</th>
                                    <th>Số điện thoại</th>
                                    <th>Địa chỉ</th>
                                    <th>Xử lý</th>
                                </tr>

                                { dataPatient && dataPatient.length > 0 && 
                                    dataPatient.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{item.timeTypeDataPatient.valueVi}</td>
                                                <td>{ item.patientData.firstName ? item.patientData.firstName+' '+item.patientData.lastName+' ( '+item.patientData.email+' ) ' 
                                                    : item.patientData.lastName+' ( '+item.patientData.email+' ) '  }</td>
                                                <td>{item.patientData.genderData.valueVi}</td>
                                                <td>{item.patientData.phonenumber}</td>
                                                <td>{item.patientData.address}</td>
                                                <td>
                                                    <button className="btn btn-confirm" onClick={() => this.handleBtnConfirm()}>Xác nhận</button>
                                                    <button className="btn btn-send-email" onClick={() => this.handleBtnSendEmail()}>Gửi hóa đơn</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>


                </div>





            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
