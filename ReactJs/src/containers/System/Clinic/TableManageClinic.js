import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageClinic.scss';
import * as actions from "../../../store/actions"

// import MarkdownIt from 'markdown-it';
// import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import {  getAllClinic } from '../../../services/userService'


// Initialize a markdown parser
// const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
// function handleEditorChange({ html, text }) {
//   console.log('handleEditorChange', html, text);
// }

class TableManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux:[],
            dataClinic: []
        }
    }

    async componentDidMount() {
        this.props.fetchAllClinic();
    }

    componentDidUpdate(prevProps,prevState, snapshot) {
        if( prevProps.allClinic !== this.props.allClinic ){
            this.setState({
                dataClinic: this.props.allClinic
            })
        }
    }

    handleDeleteClinic=(clinic) => {
        // console.log(clinic)
        this.props.deleteClinic(clinic.id);
    }

    handleUpdateClinic=(clinic) => {
        // console.log(clinic)
        this.props.handleUpdateClinicFromParent(clinic)

    }

    render() {
        // console.log('check user redux , state : ',this.props.users , this.state.usersRedux  )
        let {dataClinic}= this.state;
        console.log(this.props)
        return (
        <React.Fragment>
            <table id="TableManageClinic">
                <tbody>
                    <tr>
                        <th>Ten phong kham</th>
                        <th>Action</th>
                    </tr>

                    { dataClinic && dataClinic.length > 0 && 
                        dataClinic.map((item,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>
                                        <button className="btn-edit" onClick={()=>this.handleUpdateClinic(item) } ><i className="fas fa-pencil-alt"></i></button>
                                        <button className="btn-delete" onClick={()=>this.handleDeleteClinic(item) } ><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
 
                </tbody>
            </table>
            
            {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}
        </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        allClinic: state.admin.allClinic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllClinic: () => dispatch(actions.fetchAllClinic() ),
        deleteClinic: (id) => dispatch(actions.deleteClinic(id) )

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClinic);
