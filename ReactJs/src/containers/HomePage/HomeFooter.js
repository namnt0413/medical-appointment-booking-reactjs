import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomeFooter.css'

class HomeFooter extends Component {

    render() {
        return (
            <div className="home-footer">
		        <footer className="footer-07">
		        		<div className="row justify-content-center">
		        			<div className="col-md-12 text-center">
		        				<h2 className="footer-heading"><a href="#" className="logo">MedicalBooking.com</a></h2>
		        				<p className="menu">
		        					<a href="#">Home</a>
		        					<a href="#">Agent</a>
		        					<a href="#">About</a>
		        					<a href="#">Listing</a>
		        					<a href="#">Blog</a>
		        					<a href="#">Contact</a>
		        				</p>
		        				<ul className="ftco-footer-social p-0">
                                    <li className="ftco-animate"><a href="#" title="Twitter"><span className="fab fa-twitter"></span></a></li>
                                    <li className="ftco-animate"><a href="#"  title="Facebook"><span className="fab fa-facebook"></span></a></li>
                                    <li className="ftco-animate"><a href="#" title="Instagram"><span className="fab fa-instagram"></span></a></li>
                                </ul>
		        			</div>
		        		</div>
		        </footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
