import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// eslint-disable-next-line no-unused-vars
import _ from 'lodash'; // thu vien js

class ModalEditUser extends Component {
    // du lieu cua props lay tu state cua cha, du lieu cua cha lay tu api
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
        // console.log('did mount edit modal',this.props);
        let user = this.props.currentUser;
        if( user && !_.isEmpty(user) ){
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }

    }

    // khi bam ra ngoai thi modal mat
    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event,id) => {
        let copyState = {...this.state};
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email','password','firstName','lastName','address'];
        for( let i = 0; i < arrInput.length; i++ ){
            if( !this.state[arrInput[i]]){
                isValid = false;
                alert('Missing paramter : '+arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        // console.log('data : ',this.state);
        let isValid = this.checkValidateInput();
        if( isValid ) {
            //call api edit modal
            // console.log('data : ',this.state);
            this.props.editUserFromParent(this.state);

        }
    }

    render() {
        // console.log('get props from parent',this.props);
        // console.log(this.props.isOpen);
        return (
            <Modal 
                isOpen={this.props.isOpen} 
                toggle={ () => {this.toggle()} } 
                className={'modal-user-container'}
                size="lg"
            >
                <ModalHeader toggle={ () => {this.toggle()} }>Edit a User</ModalHeader>
                <ModalBody>
                <div className="modal-user-body">
                    <div className="input-container">
                        <label>Email</label>
                        <input type="email"  value={this.state.email} onChange={ (event) => {this.handleOnChangeInput(event,"email") }} disabled />
                    </div>
                    <div className="input-container">
                        <label>Password</label>
                        <input type="password" value={this.state.password} onChange={ (event) => {this.handleOnChangeInput(event,"password") }} disabled />
                    </div>
                    <div className="input-container">
                        <label>First Name</label>
                        <input type="text" value={this.state.firstName} onChange={ (event) => {this.handleOnChangeInput(event,"firstName") }} />
                    </div>
                    <div className="input-container">
                        <label>Last Name</label>
                        <input type="text" value={this.state.lastName} onChange={ (event) => {this.handleOnChangeInput(event,"lastName") }} />
                    </div>
                    <div className="input-container max-width-input">
                        <label>Address</label>
                        <input type="text" value={this.state.address} onChange={ (event) => {this.handleOnChangeInput(event,"address") }} />
                    </div>
                </div>


                </ModalBody>
                <ModalFooter>
                  <Button color="primary px-2" 
                  onClick={ () => {this.handleSaveUser()} }
                  >
                    Save change
                  </Button>{' '}
                  
                  <Button color="danger px-2" 
                  onClick={ () => {this.toggle()} }>
                    Cancel
                  </Button>
                </ModalFooter>
          </Modal>
        )
    }

};

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
