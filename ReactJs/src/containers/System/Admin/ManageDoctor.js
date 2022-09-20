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
            listSpecialty: [],
            listClinic: [],
            selectedPrice:'',
            selectedPayment: '',
            selectedProvince: '',
            selectedSpecialty: '',
            selectedClinic: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: '',

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
            let {resPrice,resPayment,resProvince} = this.props.allRequiredDoctorInfo;
            let dataSelectPrice = this.buildDataInputSelect(resPrice,'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment,'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince,'PROVINCE');
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }
        if( prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo ){
            // console.log('check props',this.props.allRequiredDoctorInfo)
            let {resPrice,resPayment,resProvince, resSpecialty } = this.props.allRequiredDoctorInfo;
            let dataSelectPrice = this.buildDataInputSelect(resPrice,'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment,'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince,'PROVINCE');
            let dataSpecialty = this.buildDataInputSelect(resSpecialty,'SPECIALTY');
            // console.log(dataSelectPrice,dataSelectPayment,dataSelectProvince,'')
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSpecialty
            })
        }

    }

    handleChangeSelect = async (selectedDoctor) => { // react-select
        this.setState({ selectedDoctor });
        let {listPrice,listPayment,listProvince, listSpecialty } = this.state;
        let res = await getDetailInfoDoctor(selectedDoctor.value);
        console.log(res)
        if( res && res.errCode === 0 && res.data && res.data.Markdown.description && res.data.Markdown.contentHTML && res.data.Markdown.contentMarkdown ){
            let markdown = res.data.Markdown;
            let addressClinic = '', nameClinic = '', note = '', paymentId = '', priceId = '', provinceId = '',specialtyId = '';
            let selectedPrice='', selectedPayment='',selectedProvince='',selectedSpecialty='' ;
            if( res.data.Doctor_Info ){
                addressClinic = res.data.Doctor_Info.addressClinic;
                nameClinic = res.data.Doctor_Info.nameClinic;
                note = res.data.Doctor_Info.note;

                paymentId = res.data.Doctor_Info.paymentId;
                priceId = res.data.Doctor_Info.priceId;
                provinceId = res.data.Doctor_Info.provinceId;
                specialtyId = res.data.Doctor_Info.specialtyId;

                selectedPrice = listPrice.find( item=>{
                    return item && item.value === priceId // = for listPrice, if item.value=priceId => return this item
                })
                selectedPayment = listPayment.find( item=>{
                    return item && item.value === paymentId
                })
                selectedProvince = listProvince.find( item=>{
                    return item && item.value === provinceId 
                })
                selectedSpecialty = listSpecialty.find( item=>{
                    return item && item.value === specialtyId
                })
            }
            
            
            this.setState({ 
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
            })
        } else {
            this.setState({ 
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic : '',
                nameClinic : '',
                note : '',
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                selectedSpecialty: '',
            }) 
        }
      };

    handleChangeSelectDoctorInfo = async (selectedOption,name) => {
        let stateName = name.name;
        let stateCopy = {...this.state};
        stateCopy[stateName] = selectedOption;

        this.setState({
            ...stateCopy,
        })
        console.log(selectedOption , stateName);


    }

    handleOnChangeText = (event,id) => {
        let stateCopy = {...this.state};
        stateCopy[id] = event.target.value;

        this.setState({
            ...stateCopy
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
            action: hasOldData === true ? CRUD_ACTIONS.UPDATE : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            selectedSpecialty: this.state.selectedSpecialty.value,
            selectedClinic: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '' 
        })
    }

    buildDataInputSelect = (inputData,type) => {
        let result = [];
        let { language } = this.props;
        if( inputData && inputData.length > 0 ) {
            if( type === 'USERS' ){
                inputData.map((item, index) => {
                // console.log(item)
                    let object = {};
                    let labelVi = `${item.firstName} ${item.lastName}`
                    let labelEn = `${item.lastName} ${item.firstName}`
                    object.label = language===LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id
                    result.push(object);
                })
            }
            if ( type === 'PRICE' ){
                inputData.map((item, index) => {
                    // console.log(item)
                        let object = {};
                        let labelVi = `${item.valueVi} VND`
                        let labelEn = `${item.valueEn} USD`
                        object.label = language===LANGUAGES.VI ? labelVi : labelEn;
                        object.value = item.keyMap
                        result.push(object);
                    })
            }
            if(type === 'PAYMENT' || type === 'PROVINCE'){
                inputData.map((item, index) => {
                    // console.log(item)
                        let object = {};
                        let labelVi = `${item.valueVi}`
                        let labelEn = `${item.valueEn}`
                        object.label = language===LANGUAGES.VI ? labelVi : labelEn;
                        object.value = item.keyMap
                        result.push(object);
                    })
            }
            if( type=== 'SPECIALTY' ){
                inputData.map((item, index) => {
                    // console.log(item)
                    let object = {};
                    // let labelVi = `${item.valueVi}`
                    // let labelEn = `${item.valueEn}`
                    object.label = item.name
                    object.value = item.id
                    result.push(object);
                })
            }
        }
        return result;
    }

    render() {
        // console.log('state', this.state);
        // let {listPrice,listPayment,listProvince} = this.state;
        let { listSpecialty} = this.state;

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
                        placeholder={<FormattedMessage id="admin.manage-doctor.choose-doctor" />}
                    />
                    
                </div>
                <div className="content-right">
                    <label className="">Thông tin giới thiệu</label>
                    <textarea className="form-control" rows="4"
                        onChange={ (event) => this.handleOnChangeText(event,'description') }
                        value = {this.state.description}
                    >
                    </textarea>
                </div>
            </div>
            <div className="more-info-extra row">
                <div className="col-4 form-group">
                    <label>Chọn giá</label>
                    <Select
                        options={this.state.listPrice}
                        placeholder={'Chọn giá'}
                        onChange={this.handleChangeSelectDoctorInfo}
                        value={this.state.selectedPrice}
                        name="selectedPrice"
                    />
                </div>
                <div className="col-4 form-group">
                    <label>Chọn phương thức thanh toán</label>
                    <Select
                        options={this.state.listPayment}
                        placeholder={'Chọn phương thức thanh toán'}
                        onChange={this.handleChangeSelectDoctorInfo}
                        value={this.state.selectedPayment}
                        name="selectedPayment"
                    />
                </div>
                <div className="col-4 form-group">
                    <label>Chọn tỉnh thành</label>
                    <Select
                        // value={this.state.selectedDoctor}
                        options={this.state.listProvince}
                        placeholder={'Chọn tỉnh thành'}
                        onChange={this.handleChangeSelectDoctorInfo}
                        value={this.state.selectedProvince}
                        name="selectedProvince"
                    />
                </div>
                <div className="col-4 form-group">
                    <label>Ten phong kham</label>
                    <input type="" className="form-control" 
                        onChange={ (event) => this.handleOnChangeText(event,'nameClinic') }
                        value = {this.state.nameClinic}
                    />
                </div>
                <div className="col-4 form-group">
                    <labe>Dia chi phong kham</labe>
                    <input type="" className="form-control" 
                        onChange={ (event) => this.handleOnChangeText(event,'addressClinic') }
                        value = {this.state.addressClinic}
                    />
                </div>
                <div className="col-4 form-group">
                    <label>Note</label>
                    <input type="" className="form-control" 
                        onChange={ (event) => this.handleOnChangeText(event,'note') }
                        value = {this.state.note}
                    />
                </div>
            </div>
            <div className="row"> 
            <div className="col-4 form-group">
                    <label>Chon chuyen khoa</label>
                    <Select
                        onChange={this.handleChangeSelectDoctorInfo}
                        value={this.state.selectedSpecialty}
                        name="selectedSpecialty"
                        options={this.state.listSpecialty}
                        placeholder={<FormattedMessage id="admin.manage-doctor.choose-speacialty" />}
                    />
                </div>
                <div className="col-4 form-group">
                    <label>Chon phong kham</label>
                    <Select
                        onChange={this.handleChangeSelectDoctorInfo}
                        value={this.state.selectedClinic}
                        name="selectedClinic"
                        options={this.state.listClinic}
                        placeholder={<FormattedMessage id="admin.manage-doctor.choose-speacialty" />}
                    />
                </div>
            </div>
            <div className="manage-doctor-editor">
                <MdEditor 
                    style={{ height: '320px' }} 
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
