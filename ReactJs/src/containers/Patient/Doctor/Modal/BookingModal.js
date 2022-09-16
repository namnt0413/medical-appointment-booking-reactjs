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

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.language !== this.props.language){

        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    render() {
        // console.log(this.props.match.params.id)
        let doctorId = '';
        let language = this.props.language;
        let { isOpenModal , dataSchedule } = this.props;
        if( dataSchedule && !_.isEmpty(dataSchedule) ){
            doctorId = dataSchedule.doctorId;
        }

        return (
            <Modal 
                isOpen={isOpenModal} 
                toggle={ () => {this.toggle()} }
                className={'booking-modal-container'}
                size="lg" centered
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left" > Thong tin dat lich kham benh </span>
                        <span className="right" onClick={ () => {this.toggle()} }><i className="fas fa-times"></i></span>
                    </div>
                    
                    <div className="booking-modal-body">
                        {/* {JSON.stringify(dataSchedule)} */}
                        <div className="doctor-info">
                            <ProfileDoctor
                                doctorId={doctorId}
                            />
                        </div>

                        <div className="row">
                            <div className="col-6 form-group">
                                <label className="form-label">Ho va ten</label>
                                <input className="form-control"/>
                            </div>
                            <div className="col-6 form-group">
                                <label className="form-label">So dien thoai</label>
                                <input className="form-control"/>
                            </div>
                            <div className="col-6 form-group">
                                <label className="form-label">Dia chi Email</label>
                                <input className="form-control"/>
                            </div>
                            <div className="col-6 form-group">
                                <label className="form-label">Dia chi lien he</label>
                                <input className="form-control"/>
                            </div>
                            <div className="col-12 form-group">
                                <label className="form-label">Ly do kham</label>
                                <input className="form-control"/>
                            </div>
                            <div className="col-6 form-group">
                                <label className="form-label">Gioi tinh</label>
                                <input className="form-control"/>
                            </div>
                            <div className="col-6 form-group">
                                <label className="form-label">Dat cho ai</label>
                                <input className="form-control"/>
                            </div>
                        </div>


                    </div>

                    <div className="booking-modal-footer">  
                        <button className="btn-booking-confirm btn-warning">Xac nhan</button>
                        <button className="btn-booking-cancel btn-danger" onClick={ () => {this.toggle()} }>Huy</button>
                    </div>
                </div>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
