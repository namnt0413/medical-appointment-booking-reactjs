import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import ManageUser from '../containers/System/Admin/ManageUser';
import ManageUserRedux from '../containers/System/Admin/ManageUserRedux';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty'
import ManageClinic from '../containers/System/Clinic/ManageClinic'
import Dashboard from '../containers/System/Admin/Dashboard'


class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        // console.log(this.props.isLoggedIn);
        return (
            <React.Fragment>
                {this.props.isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/manage-user" component={ManageUser} />
                            <Route path="/system/dashboard" component={Dashboard} />
                            <Route path="/system/manage-user-redux" component={ManageUserRedux} />
                            <Route path="/system/manage-doctor" component={ManageDoctor} />
                            <Route path="/system/manage-specialty" component={ManageSpecialty} />
                            <Route path="/system/manage-clinic" component={ManageClinic} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
