import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import {LANGUAGES} from '../../../utils';
import Select from 'react-select';
// import {getScheduleDoctorByDate} from '../../../services/userService'
import { FormattedMessage} from 'react-intl'
import DatePicker from '../../../components/Input/DatePicker';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.language !== this.props.language){

        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({ 
            currentDate: date[0]
        })
    }

    render() {
        // console.log(this.props.match.params.id)
        let language = this.props.language;

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
                                    <th>Ten / Email</th>
                                    <th>Gioi tinh</th>
                                    <th>Dia chi</th>
                                    <th>So dien thoai</th>
                                    <th>Thoi gian</th>
                                    <th>Trang thai</th>
                                </tr>
                                <tr>
                                    <td>Nguyen van A</td>
                                    <td>nam</td>
                                    <td>Thanh Tri, Ha Noi</td>
                                    <td>0360799786</td>
                                    <td>8:00 - 9:00</td>
                                    <td>Đã xác nhận</td>
                                </tr>

 
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
