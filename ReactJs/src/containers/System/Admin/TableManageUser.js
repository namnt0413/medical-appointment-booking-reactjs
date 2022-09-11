import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions"

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';


// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {
    // Component life cycle
    // 1. Contructor : init state
    //2. Didmount : set state - unmount
    //3. Render

    //khoi tao theo chuan react
    constructor(props) {
        super(props);
        this.state = {
            usersRedux:[]
        }
    }

    componentDidMount() {
        this.props.fetchAllUsers();
    }

    componentDidUpdate(prevProps,prevState, snapshot) {
        if( prevProps.users !== this.props.users ){
            this.setState({
                usersRedux: this.props.users
            })
        }
    }

    handleDeleteUser=(user) => {
        // console.log(user)
        this.props.deleteUser(user.id);
    }

    handleUpdateUser=(user) => {
        console.log(user)
        this.props.handleUpdateUserFromParent(user)

    }

    render() {
        // console.log('check user redux , state : ',this.props.users , this.state.usersRedux  )
        let arrUsers = this.state.usersRedux
        return (
        <React.Fragment>
            <table id="TableManageUser">
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>

                    { arrUsers && arrUsers.length > 0 && 
                        arrUsers.map((item,index)=>{
                            return(
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className="btn-edit" onClick={()=>this.handleUpdateUser(item) } ><i className="fas fa-pencil-alt"></i></button>
                                        <button className="btn-delete" onClick={()=>this.handleDeleteUser(item) } ><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
 
                </tbody>
            </table>
            
            <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
        </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUsers: () => dispatch(actions.fetchAllUsersStart() ),
        deleteUser: (id) => dispatch(actions.deleteUser(id) )

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
