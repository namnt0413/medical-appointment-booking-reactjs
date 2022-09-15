import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfo.scss';
import {LANGUAGES} from '../../../utils';
import Select from 'react-select';
import {getScheduleDoctorByDate} from '../../../services/userService'
import { FormattedMessage} from 'react-intl'

class DoctorExtraInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfo: false
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.language !== this.props.language){
            let arrDay = this.getArrDay(this.props.language);
            this.setState({arrDay: arrDay});
        }
    }

    showHiddenInfo = (status) => {
        this.setState({
            isShowDetailInfo: status
        })
    }

    render() {
        // console.log(this.props.match.params.id)
        let language = this.props.language;
        let {isShowDetailInfo} = this.state;
        
        return (
            <div className="doctor-extra-info-container">
                <div className="content-up">
                    <div className="text-address">  ĐỊA CHỈ KHÁM</div>
                    <div className="name-clinic">   Phòng khám Bệnh viện Đại học Y Dược 1</div>
                    <div className="detail-address">20-22 Dương Quang Trung, Phường 12, Quận 10, Tp. HCM</div>
                </div>
                <div className="content-down">
                    { isShowDetailInfo === false &&
                        <div className="short-info">GIÁ KHÁM: 200.000đ
                        <span
                            onClick={() => this.showHiddenInfo(true) }
                            > Xem chi tiết</span>
                        </div>
                     }

                    { isShowDetailInfo === true && 
                        <>
                            <div className="title-price">GIÁ KHÁM:</div>
                            <div className="detail-info">
                                <div className="price">
                                    <div className="left">Giá khám : </div>
                                    <div className="right">200.000d</div>
                                </div>
                                <div className="note">Giá tư vấn 15 phút: 250.000vnđ </div>
                                <div className="note">Giá tư vấn 30 phút: 500.000vnđ</div>
                            </div>
                            
                            <div className="payment">Phòng khám có thanh toán bằng hình thức tiền mặt và quẹt thẻ</div>

                            <div className="hide-price">
                                <span
                                onClick={() => this.showHiddenInfo(false)}
                                >Ẩn bẳng giá</span>
                            </div>
                        </>
                    }

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
