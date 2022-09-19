import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageSpecialty.scss';
import * as actions from "../../../store/actions"

// import MarkdownIt from 'markdown-it';
// import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import {getAllSpecialty} from '../../../services/userService'


// Initialize a markdown parser
// const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
// function handleEditorChange({ html, text }) {
//   console.log('handleEditorChange', html, text);
// }

class TableManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux:[],
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        this.props.fetchAllSpecialty();
    }

    componentDidUpdate(prevProps,prevState, snapshot) {
        if( prevProps.allSpecialty !== this.props.allSpecialty ){
            this.setState({
                dataSpecialty: this.props.allSpecialty
            })
        }
    }

    handleDeleteSpecialty=(specialty) => {
        // console.log(specialty)
        this.props.deleteSpecialty(specialty.id);
    }

    handleUpdateSpecialty=(specialty) => {
        // console.log(specialty)
        this.props.handleUpdateSpecialtyFromParent(specialty)

    }

    render() {
        // console.log('check user redux , state : ',this.props.users , this.state.usersRedux  )
        let arrUsers = this.state.usersRedux
        let {dataSpecialty}= this.state;
        // console.log(this.props)
        return (
        <React.Fragment>
            <table id="TableManageSpecialty">
                <tbody>
                    <tr>
                        <th>Ten chuyen khoa</th>
                        <th>Action</th>
                    </tr>

                    { dataSpecialty && dataSpecialty.length > 0 && 
                        dataSpecialty.map((item,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>
                                        <button className="btn-edit" onClick={()=>this.handleUpdateSpecialty(item) } ><i className="fas fa-pencil-alt"></i></button>
                                        <button className="btn-delete" onClick={()=>this.handleDeleteSpecialty(item) } ><i className="fas fa-trash"></i></button>
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
        allSpecialty: state.admin.allSpecialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty() ),
        deleteSpecialty: (id) => dispatch(actions.deleteSpecialty(id) )

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageSpecialty);
