import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Specialty.scss';
import '../HomePage.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
// import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyImg from "../../../assets/specialty/120331-co-xuong-khop.jpg"

class About extends Component {

    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Truyền thông nói gì về Medical Booking
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe width="90%" height="500" src="https://www.youtube.com/embed/-tKVN2mAKRI" title="DAOKO × 米津玄師『打上花火』MUSIC VIDEO" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>                    
                    </div>
                    
                    <div className="content-right">
                        <p>
                            DAOKO  米津玄師『打上花火』配信中！
                            ▽iTunes
                            https://itunes.apple.com/jp/album/id1...


                            DAOKO  米津玄師『打上花火』アニメーションMUSIC VIDEO
                            映画『打ち上げ花火、下から見るか？横から見るか？』主題歌

                            このアニメーションミュージックビデオのためのオリジナルシーンをふんだんに使って構成したミュージックビデオ完成！


                            Cygames presents DAOKO TOUR 2017-2018 “THANK YOU BLUE”のオフィシャルHP先行受付開始
                        </p> 
                    </div>

                </div>


            </div>
        
       );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
