import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import {LANGUAGES} from '../../../utils';
import Select from 'react-select';
import { FormattedMessage} from 'react-intl'
import DatePicker from '../../../components/Input/DatePicker';
import {getListPatient , postSendPrescription} from '../../../services/doctorService'
import moment from 'moment';
import PrescriptionModal from './PrescriptionModal'
import {toast} from "react-toastify"
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenModalPrescription: false,
            dataModal: {},
            isShowLoading: false
        }
    }

    async componentDidMount() {
        this.getDataPatient();
        
    }
    
    async componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.language !== this.props.language){

        }
    }

    getDataPatient = async () => { 
        let {user} = this.props;
        let {currentDate} = this.state;
        let formatedDate = new Date(currentDate).getTime() ;
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


    handleOnChangeDatePicker = (date) => {
        this.setState({ 
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient();
        })
    }

    handleOpenPrescriptionModal = (item) => { // xu ly viec mo modal don thuoc va truyen data cho modal qua props
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName ? item.patientData.firstName+' '+item.patientData.lastName : item.patientData.lastName
        }      
        this.setState({
            isOpenModalPrescription: true,
            dataModal: data
        })  
    }

    togglePrescriptionModal = () => {
        this.setState({
            isOpenModalPrescription: !this.state.isOpenModalPrescription
        })
    }

    sendPrescription = async (dataFromModal) => {
        // console.log('parent check: ', dataFromModal , this.state.dataModal);
        let {dataModal} = this.state;
        this.setState({
            isShowLoading: true 
        })
        let res = await postSendPrescription({
            email: dataFromModal.email,
            image: dataFromModal.image,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,   
            language: this.props.language,
            patientName: dataModal.patientName,
        });
        console.log(res);
        if( res && res.errCode === 0){ 
            this.setState({
                isShowLoading: false 
            })
            toast.success('Gửi đơn thuốc thành công');
            this.togglePrescriptionModal();
            await this.getDataPatient();
        } else {
            this.setState({
                isShowLoading: false  
            })
            toast.error('Gửi đơn thuốc thất bại')
            console.log('error send email',res)
        }
    }


    render() {
        // console.log('check state: ',  this.state)
        // console.log('check props: ',  this.props)

        let language = this.props.language;
        let {dataPatient , isOpenModalPrescription , dataModal} = this.state;

        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >

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

                                    { dataPatient && dataPatient.length > 0 ? 
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
                                                        <button className="btn btn-confirm" onClick={() => this.handleOpenPrescriptionModal(item)} >Xác nhận</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    :
                                    <tr>
                                        <td colSpan="7" style={{textAlign: "center"}}>Không có lịch hẹn vào ngày này</td>
                                    </tr>
                                    
                                    }
                                </tbody>
                            </table>
                        </div>


                    </div>

                </div>
            
                <PrescriptionModal
                    isOpenModal = {isOpenModalPrescription}
                    toggleFromParent = {this.togglePrescriptionModal}
                    dataModal = {dataModal}
                    sendPrescription = {this.sendPrescription}
                />

                
                </LoadingOverlay>
            </>
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
