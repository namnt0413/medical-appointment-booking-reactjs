import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageUser from '../containers/System/ManageUser';
import ManageUserRedux from '../containers/System/Admin/ManageUserRedux';
import Header from '../containers/Header/Header';

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
                            <Route path="/system/manage-user-redux" component={ManageUserRedux} />
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
