import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './DoctorDetail.scss';
import './DoctorDetail.css';
import {getDetailInfoDoctor} from '../../../services/userService';
import {LANGUAGES} from '../../../utils'
import DoctorSchedule from './DoctorSchedule'
import DoctorMoreInfo from './DoctorMoreInfo'
import Comment from '../SocailPlugin/Comment'
import LikeAndShare from '../SocailPlugin/LikeAndShare'
import * as actions from '../../../store/actions'


class DoctorDetail extends Component {
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

            this.props.changeIsShowLoading(true);  // loading
            let res = await getDetailInfoDoctor(id);
            // console.log('check : ', res);
            if( res && res.errCode === 0 ){
                this.props.changeIsShowLoading(false);  //not loading
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
                                {language === LANGUAGES.VI ? detailDoctor.positionData.valueVi : 
                                language === LANGUAGES.EN ? detailDoctor.positionData.valueEn :
                                detailDoctor.positionData.valueJp} {detailDoctor.firstName} {detailDoctor.lastName}
                            </div>
                            }

                            <div className="row down">
                                { detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description ? 
                                language===LANGUAGES.VI ? <span>{detailDoctor.Markdown.description}</span> :
                                language===LANGUAGES.EN ? <span>{detailDoctor.Markdown.descriptionEn}</span> :
                                <span>{detailDoctor.Markdown.descriptionJp}</span>
                                : ""
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
                                 <DoctorMoreInfo
                                    doctorIdFromParent = {this.state.currentDoctorId}
                                />
                        {/* </div> */}
                      </div>
                    </div>
                    <div className="row detail-info-doctor">
                        <div className="col-lg-12 mt-2 mt-lg-2">
                            {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML ?
                                language===LANGUAGES.VI ?
                                <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>
                                : language===LANGUAGES.EN ?
                                <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTMLEn }}></div>
                                : 
                                <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTMLJp }}></div>
                            : ""
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
        language: state.app.language,
        isShowLoading: state.app.isShowLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeIsShowLoading: (isShowLoading) => dispatch(actions.changeIsShowLoading(isShowLoading))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);
