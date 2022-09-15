import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from "../../../store/actions"
import { LANGUAGES , CRUD_ACTIONS, CommonUtils } from '../../../utils'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailInfoDoctor } from '../../../services/userService';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            contentMarkdown:'',
            contentHTML:'',
            selectedDoctor: '',
            description: '',

            listDoctors:[],
            hasOldData: false,

            //savt to doctor-info table
            listPrice:[],
            listPayment: [],
            listProvince: [],
            selectedPrice:'',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',

            allRequiredDoctorInfo: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getRequiredDoctorInfo();
    }

    componentDidUpdate(prevProps,prevState, snapshot) {
        if( prevProps.allDoctors !== this.props.allDoctors ){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors,'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }
        if( prevProps.language !== this.props.language){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors,'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }
        if( prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo ){
            console.log('check props',this.props.allRequiredDoctorInfo)
            let {resPrice,resPayment,resProvince} = this.props.allRequiredDoctorInfo;
            let dataSelectPrice = this.buildDataInputSelect(resPrice,'');
            let dataSelectPayment = this.buildDataInputSelect(resPayment,'');
            let dataSelectProvince = this.buildDataInputSelect(resProvince,'');
            console.log(dataSelectPrice,dataSelectPayment,dataSelectProvince,'')
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }

    }

    handleChangeSelect = async (selectedDoctor) => { // react-select
        this.setState({ selectedDoctor }
        );
        let res = await getDetailInfoDoctor(selectedDoctor.value);
        console.log(res)
        if( res && res.errCode === 0 && res.data && res.data.Markdown.description && res.data.Markdown.contentHTML && res.data.Markdown.contentMarkdown ){
            let markdown = res.data.Markdown;
            this.setState({ 
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
            })
        } else {
            this.setState({ 
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
            }) 
        }
      };

    handleOnChangeDescription = (event) => {
        this.setState({
            description : event.target.value
        })
    } 

    handleEditorChange = ({ html, text }) => {
        // console.log('handleEditorChange', html, text);
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveInfoDoctor = () => {
        let {hasOldData} = this.state;
        this.props.saveInfoDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.UPDATE : CRUD_ACTIONS.CREATE
        })
    }

    buildDataInputSelect = (inputData,type) => {
        let result = [];
        let { language } = this.props;
        if( inputData && inputData.length > 0 ) {
            inputData.map((item, index) => {
                // console.log(item)
                let object = {};
                let labelVi = type==='USERS' ? `${item.firstName} ${item.lastName}` : `${item.valueVi}`
                let labelEn = type==='USERS' ? `${item.lastName} ${item.firstName}` : `${item.valueEn}`
                object.label = language===LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id
                result.push(object);
            })
        }
        return result;
    }

    render() {
        // console.log('state', this.state , this.state.selectedDoctor);
        let {listPrice,listPayment,listProvince} = this.state;

        return (
        <div className="manage-doctor-container">            
            <div className="manage-doctor-title title">
                <FormattedMessage id="admin.manage-doctor.title" />
            </div>
            <div className="more-info">
                <div className="content-left form-group">
                    <label className=""><FormattedMessage id="admin.manage-doctor.choose-doctor" /></label>
                    <Select
                        value={this.state.selectedDoctor}
                        onChange={this.handleChangeSelect}
                        options={this.state.listDoctors}
                        placeholder={'Chọn bác sĩ'}
                    />
                    
                </div>
                <div className="content-right">
                    <label className="">Thông tin giới thiệu</label>
                    <textarea className="form-control" rows="4"
                        onChange={ (event) => this.handleOnChangeDescription(event) }
                        value = {this.state.description}
                    >
                    </textarea>
                </div>
            </div>
            <div className="more-info-extra row">
                <div className="col-4 form-group">
                    <label>Chọn giá</label>
                    <Select
                        // value={this.state.selectedDoctor}
                        onChange={this.handleChangeSelect}
                        options={this.state.listPrice}
                        placeholder={'Chọn giá'}
                    />
                </div>
                <div className="col-4 form-group">
                    <label>Chọn phương thức thanh toán</label>
                    <Select
                        // value={this.state.selectedDoctor}
                        onChange={this.handleChangeSelect}
                        options={this.state.listPayment}
                        placeholder={'Chọn phương thức thanh toán'}
                    />
                </div>
                <div className="col-4 form-group">
                    <label>Chọn tỉnh thành</label>
                    <Select
                        // value={this.state.selectedDoctor}
                        onChange={this.handleChangeSelect}
                        options={this.state.listProvince}
                        placeholder={'Chọn tỉnh thành'}
                    />
                </div>
                <div className="col-4 form-group">
                    <label>Ten phong kham</label>
                    <input type="" className="form-control" />
                </div>
                <div className="col-4 form-group">
                    <labe>Dia chi phong kham</labe>
                    <input type="" className="form-control" />
                </div>
                <div className="col-4 form-group">
                    <label>Note</label>
                    <input type="" className="form-control" />
                </div>
            </div>
            <div className="manage-doctor-editor">
                <MdEditor 
                    style={{ height: '500px' }} 
                    renderHTML={text => mdParser.render(text)} 
                    onChange={this.handleEditorChange } 
                    value={this.state.contentMarkdown}
                />
            </div>

            <button className= { this.state.hasOldData===true ? "btn-save-content-doctor" : "btn-create-content-doctor" }       
                onClick={ () => this.handleSaveInfoDoctor() }
            >
                {this.state.hasOldData === true ?
                    <span>Lưu thông tin</span> : <span>Tạo thông tin</span>
                }
                
            </button>
        </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors() ),
       saveInfoDoctor: (data) => dispatch(actions.saveInfoDoctor(data)),
       getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
