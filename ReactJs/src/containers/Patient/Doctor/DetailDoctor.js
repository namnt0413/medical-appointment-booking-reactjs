import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './DetailDoctor.scss';
import './DetailDoctor.css';
import {getDetailInfoDoctor} from '../../../services/userService';
import {LANGUAGES} from '../../../utils'
import DoctorSchedule from './DoctorSchedule'
import DoctorExtraInfo from './DoctorExtraInfo'
import Comment from '../SocailPlugin/Comment'
import LikeAndShare from '../SocailPlugin/LikeAndShare'

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1,
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id ){
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId : id
            })
            let res = await getDetailInfoDoctor(id);
            // console.log('check : ', res);
            if( res && res.errCode === 0 ){
                this.setState({
                    detailDoctor: res.data
                })
            }
             
        }
    }

    componenetDidUpdate(prevProps,prevState,snapshot) {
        if(this.props.match && this.props.match.params && this.props.match.params.id ){

        }

    }

    render() {
        // console.log(this.props.match.params.id)
        let {detailDoctor} = this.state;
        let language = this.props.language;
        // console.log('check detailDoctor: ', (detailDoctor) );

        let currentURL = +process.env.REACT_APP_IS_LOCALHOST === 0 ?
        "https://medicalbookingg.herokuapp.com/" : window.location.href;
        
        return (
            <>
            <HomeHeader
                isShowBanner = {false}
            />

                <section id="doctors" className="doctors">
                  <div className="container">
                    <div className="row">
                        <div className="col-lg-4 mt-4 mt-lg-0" >
                            <div className="pic" style={{backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }} ></div>
                        </div>
                        <div className="col-lg-8 mt-4 mt-lg-0">
                            { detailDoctor && detailDoctor.positionData && detailDoctor.positionData.valueVi && detailDoctor.positionData.valueEn
                            &&<div className="row up">
                                {language === LANGUAGES.VI ? detailDoctor.positionData.valueVi : detailDoctor.positionData.valueEn } { }
                                  {detailDoctor.firstName} {detailDoctor.lastName}
                            </div>
                            }

                            <div className="row down">
                                { detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description
                                && <span>
                                    {detailDoctor.Markdown.description}
                                </span>
                                }
                                <div className="like-share-plugin">
                                    <LikeAndShare
                                        dataHref={currentURL}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 mt-4 mt-lg-0">
                        {/* <div className="member d-flex align-items-start"> */}
                                <DoctorSchedule
                                   detailDoctorFromParent = {this.state.currentDoctorId}
                                />
                        {/* </div> */}
                      </div>
                            
                      <div className="col-lg-6 mt-4 mt-lg-0">
                        {/* <div className="member d-flex align-items-start"> */}
                                 <DoctorExtraInfo
                                    doctorIdFromParent = {this.state.currentDoctorId}
                                />
                        {/* </div> */}
                      </div>
                    </div>
                    <div className="row detail-info-doctor">
                        <div className="col-lg-12 mt-2 mt-lg-2">
                            {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML 
                            && <div dangerouslySetInnerHTML={{__html: detailDoctor.Markdown.contentHTML }}></div>
                            }
                        </div>
                    </div>
                    <div className="row">
                        <Comment
                            dataHref={currentURL}
                            width={"100%"}
                            // numPost=
                        />    
                    </div>
                        
                  </div>
                </section>

            <HomeFooter/>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
