import React, { Component } from 'react';
import { connect } from "react-redux";
import './VerifyEmail.css';
// import {LANGUAGES} from '../../../utils';
import Select from 'react-select';
// import {getScheduleDoctorByDate} from '../../../services/userService'
import { FormattedMessage} from 'react-intl'
import {postVerifyBookingAppointment} from '../../services/userService' 
import HomeHeader from '../../containers/HomePage/HomeHeader'

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {
        if(this.props.location && this.props.location.search ){
            //lay ra token va doctorId thong qua location search
            let urlParams = new URLSearchParams(this.props.location.search)
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            // console.log(token,doctorId)
            
            let res = await postVerifyBookingAppointment({
                token: token,
                doctorId: doctorId,
            })

            if(res && res.errCode === 0){
                this.setState({
                    bookingVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    bookingVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }
    }

    async componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.language !== this.props.language){

        }
    }

    render() {
        let language = this.props.language;
        // let {isShowDetailInfo , extraInfo } = this.state;
        let {bookingVerify,errCode} = this.state;

        return (
            <>
                <HomeHeader/>
                {bookingVerify === false ?
                    <div>Loading data ...</div>
                    :
                    <div>
                        { errCode === 0 ? 
                        <div className="verify-title booking-success">X??c nh???n l???ch h???n th??nh c??ng </div> 
                        : <div className="verify-title booking-failed">L???ch h???n kh??ng t???n t???i ho???c ???? ???????c x??c nh???n</div>
                        }
                    </div>
                
                }

            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
