import React, { Component } from 'react';
import { connect } from "react-redux";
import './PrescriptionModal.scss';
import { LANGUAGES , CRUD_ACTIONS, CommonUtils } from '../../../utils'

import Select from 'react-select';
import { FormattedMessage} from 'react-intl'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
import { toast } from 'react-toastify';
import moment from 'moment';

class PrescriptionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            email: '',
            image: '',
            note: '',
        }
    }

    async componentDidMount() {
        if( this.props.dataModal ){
            this.setState({
                email: this.props.dataModal.email
            })
        }

    }

    async componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.language !== this.props.language){

        }
        if( prevProps.dataModal !== this.props.dataModal ){
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                image: base64
            })
        }
    }

    handleOnChangeNote = (event) => {
        this.setState({
            note: event.target.value
        })
    }

    handleSendPrescription = () => {
        console.log('check state: ',this.state)
        this.props.sendPrescription(this.state)
    }



    render() {
        console.log(this.props)
        let {language} = this.props;
        let { isOpenModal , dataModal, sendPrescription } = this.props;

        // if( dataSchedule && !_.isEmpty(dataSchedule) ){
        //     doctorId = dataSchedule.doctorId;
        // }

        return (
            <Modal 
                isOpen={isOpenModal} 
                toggle={ () => {this.toggle()} }
                className={'prescription-modal-container'}
                size="md" centered
            >
                <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>Email benh nhan</label>
                            <input type="email" className="form-control" value={this.state.email} onChange={(event)=>this.handleOnChangeEmail(event)}></input>
                        </div>
                        <div className="col-6 form-group">
                            <label>Chon file don thuoc</label>
                            <input type="file" className="form-control-file" onChange={(event)=>this.handleOnChangeImage(event)}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 form-group">
                            <label>Ghi chú của bác sĩ</label>
                            <input type="email" className="form-control" value={this.state.note} onChange={(event)=>this.handleOnChangeNote(event)}></input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={()=>this.handleSendPrescription()}>Send</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionModal);
