import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import HomePage from './HomePage/HomePage.js';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'
import Home from '../routes/Home';
// import Login from '../routes/Login';
import Login from '../containers/Auth/Login';
// import Header from './Header/Header';
import System from '../routes/System';
import DoctorDetail from './Patient/Doctor/DoctorDetail'
import SpecialtyDetail from './Patient/Specialty/SpecialtyDetail'
import ClinicDetail from './Patient/Clinic/ClinicDetail'
import Doctor from '../routes/Doctor'
import ConfirmModal from '../components/ConfirmModal';
import CustomScrollbars from '../components/CustomScrollbars';
import VerifyEmail from '../containers/Patient/VerifyEmail'
import LoadingOverlay from 'react-loading-overlay';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // isShowLoading: ""
        } 
    }

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        let {isShowLoading} = this.props; // lay ra tu state admin cua redux
        console.log(isShowLoading)
        return (
            <Fragment>
                <LoadingOverlay
                    active={isShowLoading}
                    spinner
                    text='Loading...'
                >
                <Router history={history}>  {/* Luu giu lai lich su , ko phai goi api nhieu lan*/}
                    <div className="main-container">
                        <ConfirmModal />
                        <div className="content-container">
                        <CustomScrollbars style={ {height:'100vh' ,width:'100%'}  } >
                            <Switch>
                            {/* path da duoc chuan hoa trong constant.js */}
                                <Route path={path.HOME} exact component={(Home)} />
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                <Route path={'/doctor'} component={userIsAuthenticated(Doctor)} />

                                <Route path={path.HOMEPAGE} component={HomePage} />
                                <Route path={path.DETAIL_DOCTOR} component={DoctorDetail} />
                                <Route path={path.DETAIL_SPECIALTY} component={SpecialtyDetail} />
                                <Route path={path.DETAIL_CLINIC} component={ClinicDetail} />

                                <Route path={path.VERIFY_EMAIL_BOOKING} component={VerifyEmail} />
                            </Switch>
                        </CustomScrollbars>    
                        </div>

                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}

                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Router>
                </LoadingOverlay>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
        isShowLoading: state.app.isShowLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);