import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss';
import {LANGUAGES} from '../../../utils';
import Select from 'react-select';
// import {getScheduleDoctorByDate} from '../../../services/userService'
import { FormattedMessage} from 'react-intl'
import { getProfileDoctor } from '../../../services/userService';
import NumberFormat from 'react-number-format';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorProfile : {}
        }
    }

    async componentDidMount() {
        let data = await this.getProfileDoctorFromService(this.props.doctorId);
        this.setState({
            doctorProfile: data
        })
    }

    async componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.language !== this.props.language){

        }
        if( prevProps.doctorId !== this.props.doctorId){
            
        }
    }

    getProfileDoctorFromService = async (id) => {
        let result = {};
        if(id) {
            let res = await getProfileDoctor(id);
            if(res && res.errCode === 0){
                result = res.data;
            }
        }
        return result;
    }

    render() {
        // console.log(this.props.match.params.id)
        let language = this.props.language;
        let {doctorProfile } = this.state;
        console.log(this.state)

        return (
        <>   
            <div className="intro-doctor">
                <div className="content-left"
                    style={{backgroundImage: `url(${doctorProfile && doctorProfile.image ? doctorProfile.image : ''})` }} 
                >
                </div>
                <div className="content-right">
                    { doctorProfile && doctorProfile.positionData && doctorProfile.positionData.valueVi && doctorProfile.positionData.valueEn
                    &&  <div className="up">
                            {language === LANGUAGES.VI ? doctorProfile.positionData.valueVi : doctorProfile.positionData.valueEn } { }
                            {doctorProfile.firstName} {doctorProfile.lastName}
                    </div>
                    }
                    {   <div className="down">
                            { doctorProfile && doctorProfile.Markdown && doctorProfile.Markdown.description
                            && <span>
                                {doctorProfile.Markdown.description}
                            </span>
                        }
                    </div> }
                </div>
            </div>
            <div className="price">
            Giá khám:  
                {doctorProfile && doctorProfile.Doctor_Info && language===LANGUAGES.VI &&
                    <NumberFormat 
                        className="currency"
                        value={doctorProfile.Doctor_Info.priceTypeData.valueVi}
                        displayType="text"
                        thousandSeparator={true}
                        suffix=" VND" 
                    />  
                }
                {doctorProfile && doctorProfile.Doctor_Info && language===LANGUAGES.EN &&
                    <NumberFormat 
                        className="currency"
                        value={doctorProfile.Doctor_Info.priceTypeData.valueEn}
                        displayType="text"
                        thousandSeparator={true}
                        suffix=" $" 
                    />  
                }
            </div>   
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);