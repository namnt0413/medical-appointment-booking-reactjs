import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService'
import { LANGUAGES } from '../../../utils'
import * as actions from "../../../store/actions"

class ManageUserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArray: []
        }
    }

    async componentDidMount() {
        // try {
        //     let response = await getAllCodeService('gender');
        //     // console.log('check response', response);
        //     if( response && response.errCode === 0 ){
        //         this.setState({
        //             genderArray: response.data
        //         })
        //     }
        // } catch (error) {
        //     console.error(error);
        // }

        this.props.getGenderStart();
    }

    componentDidUpdate(prevProps,prevState,snapshot) {
        if( prevProps.genders !== this.props.genders ){
            this.setState({
                genderArray: this.props.genders
            });
        }
    }

    render() {
        // console.log('check state', this.state.genderArray)
        let genders = this.state.genderArray; // = set genders = 1 mang cac gender
        let language = this.props.language; // lay language tu redux

        return (
            <div className="user-redux-container" >
                <div className="title">
                    User mangage with REDUX
                </div>

                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12"><FormattedMessage id="manage-user.add"/></div>
                            <div className="col-3">
                                <label>Email</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="col-3">
                                <label>Password</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="col-3">
                                <label>First Name</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="col-3">
                                <label>Last Name</label>
                                <input type="text" className="form-control"/>
                            </div>  
                            <div className="col-3">
                                <label>Phone Number</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="col-9">
                                <label>Address</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="col-3">
                                <label>Gender</label>
                                <select className="form-control">
                                <option selected>Choose</option>
                                {genders && genders.length > 0 &&
                                    genders.map( (item,index) => {
                                       // {/* console.log(index,item); */}
                                        return(
                                       <option key={index}> { language===LANGUAGES.VI ? item.valueVi : item.valueEn} </option>
                                        )
                                    })
                            
                                }
                                </select>
                            </div>
                            <div className="col-3">
                                <label>Role</label>
                                <select className="form-control">
                                    <option selected value="">Choose</option>
                                    <option value="">User</option>
                                    <option value="">Doctor</option>
                                    <option value="">Admin</option>
                                </select>
                            </div>
                            <div className="col-3">
                                <label>Image</label>
                                <input type="text" className="form-control"/>
                            </div>

                            <div className="col-12">
                                <button type="button" className="btn btn-primary">SAVE</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
        getGenderStart: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUserRedux);
