import React, { Component } from 'react';
import { connect } from "react-redux";
// import './DafaultClass.scss';
import {LANGUAGES} from '../../../utils';
import Select from 'react-select';
// import {getScheduleDoctorByDate} from '../../../services/userService'
import { FormattedMessage} from 'react-intl'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.language !== this.props.language){

        }
    }

    render() {
        // console.log(this.props.match.params.id)
        let language = this.props.language;

        return (
            <div>
                <h2 className='title'>WELCOME TO MEDICAL BOOKING DASHBOARD</h2>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
