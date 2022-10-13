import db from '../models/index';
require('dotenv').config();
import _ from 'lodash'
import emailService from '../services/emailService'

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorHome = (limitInput) => {
    return new Promise( async (resolve, reject) => {
        try {
            let users = await db.User.findAll({ 
                limit: limitInput,
                order: [['createdAt','DESC']],
                where: { roleId : 'R2' },
                attributes: {
                    exclude: ['password','address','gender','genderData','phonenumber','roleId', 'createdAt', 'updatedAt'] // loai bo di thuoc tinh password
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueVi','valueEn']  },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueVi','valueEn']  },
                    { model: db.Doctor_Info, attributes: ['clinicId','specialtyId'] ,
                         include: [
                        { model: db.Clinic, as: 'clinicData', attributes: ['name'] },
                        { model: db.Specialty, as: 'specialtyData', attributes: ['name'] },
                         ]
                    },
                ],
                // include: [
                // ],
                raw: true,
                nest: true,

            })
            resolve({
                errCode: 0,
                data: users
            })

        } catch (error) {
            reject(error);
        }
    })
}

let getAllDoctors = () => {
    return new Promise( async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2'},
                attributes: {
                    exclude: ['password','image'] // loai bo di thuoc tinh password
                },
            })
            resolve({
                errCode: 0,
                data: doctors
            });

        } catch (error) {
            reject(error);
        }

    })
}

let checkRequiredFields = (inputData) => {
    let arr = ['doctorId' , 'contentHTML' ,'contentMarkdown', 'action' ,'selectedPrice', 'selectedPayment' ,
        'selectedProvince' ,'nameClinic', 'addressClinic',  'note' , 'selectedSpecialty' ] ;
    let isValid = true;
    let element = '';
    for (let i = 0; i < arr.length; i++) {
        if( !inputData[arr[i]] ) {
            isValid = false;
            element = arr[i];
            break;
        }
    }
    return {
        isValid: isValid,
        element: element
    }
}

let saveInfoDoctor = (inputData) => {
    return new Promise( async (resolve, reject) => {
        try {
            let checkObj = checkRequiredFields(inputData);
            if( checkObj.isValid === false ) {
                resolve({
                    errCode:1,
                    errMessage: `Missing required parameter: ${checkObj.element} `
                })
            }
            else {
                //upsert to markdown
                if(inputData.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId
                    }) 
                } else if(inputData.action === 'UPDATE') {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: inputData.doctorId },
                        raw: false
                    })
                    if(doctorMarkdown){
                        doctorMarkdown.contentHTML = inputData.contentHTML;
                        doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
                        doctorMarkdown.description = inputData.description;
                        // doctorMarkdown.updatedAt = new Date();
                        await doctorMarkdown.save();
                    }

                }

                //upsert to doctor-info
                let doctorInfo = await db.Doctor_Info.findOne({
                    where: {
                        doctorId: inputData.doctorId, 
                    },
                    raw: false
                })
                if( doctorInfo) { //update
                   doctorInfo.doctorId= inputData.doctorId;
                   doctorInfo.priceId = inputData.selectedPrice;
                   doctorInfo.paymentId = inputData.selectedPayment;
                   doctorInfo.provinceId = inputData.selectedProvince;
                   doctorInfo.nameClinic = inputData.nameClinic;
                   doctorInfo.addressClinic = inputData.addressClinic;
                   doctorInfo.note = inputData.note;
                   doctorInfo.specialtyId = inputData.selectedSpecialty;
                   doctorInfo.clinicId = inputData.selectedClinic;
                   await doctorInfo.save();

                } else { // create
                    await db.Doctor_Info.create({
                    doctorId: inputData.doctorId,
                    priceId : inputData.selectedPrice,
                    paymentId : inputData.selectedPayment,
                    provinceId : inputData.selectedProvince,
                    nameClinic : inputData.nameClinic,
                    addressClinic : inputData.addressClinic,
                    note : inputData.note,
                    specialtyId : inputData.selectedSpecialty,
                    clinicId : inputData.selectedClinic
                    })

                }

                resolve({
                    errCode: 0,
                    errMessage: 'save info doctor success'
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

let getDetailDoctor= (inputId) => {
    return new Promise( async (resolve, reject) => {
        try {
            if(!inputId){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId
                    } , 
                    attributes: {
                        exclude: ['password'] // loai bo di thuoc tinh password
                    },
                    include: [
                        { model: db.Markdown , 
                            attributes: ['description','contentHTML','contentMarkdown']
                        },

                        { model: db.Doctor_Info , 
                            attributes: { 
                                exclude : ['id','doctorId'] 
                            },
                            include: [
                                { model: db.Allcode , as: 'priceTypeData', attributes: ['valueVi','valueEn']},
                                { model: db.Allcode , as: 'paymentTypeData', attributes: ['valueVi','valueEn']},
                                { model: db.Allcode , as: 'provinceTypeData', attributes: ['valueVi','valueEn']},
                            ]
                        },

                        { model: db.Allcode, as: 'positionData', attributes: ['valueVi','valueEn']  },
                        { model: db.Allcode, as: 'genderData', attributes: ['valueVi','valueEn']  },
                    ],
                    raw: true,
                    nest: true
                })
                if(data && data.image){ 
                    data.image = Buffer.from(data.image,'base64').toString('binary'); // convert image to base64
                }
                // console.log(data.image);
                if( !data){ data={} }

                resolve({
                    errCode: 0,
                    data: data
                })
            }


        } catch (error) {
            reject(error);   
        }
    })
}

let bulkCreateSchedule = (data) => {
    console.log(data);
    return new Promise( async (resolve, reject) =>{
        try {
            if( !data.arrSchedule || !data.doctorId || !data.date ){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let schedule = data.arrSchedule
                if(schedule && schedule.length > 0) {
                    schedule = schedule.map(item =>{
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item; 
                    })
                }

                //get all existing data
                let existing = await db.Schedule.findAll(
                    {
                        where: { doctorId: data.doctorId , date : '' + data.date },
                        attributes: ['timeType','date','doctorId','maxNumber'],
                        raw : true
                    }
                );
                
                //compare different
                let toCreate = _.differenceWith(schedule, existing,(a,b)=>{
                    return a.timeType === b.timeType && +a.date === +b.date;
                });

                //create data
                if(toCreate && toCreate.length > 0){
                    await db.Schedule.bulkCreate(toCreate);
                }                
                resolve({
                    errCode: 0,
                    errMessage: 'Create schedule successfully'
                })
            }

        } catch (error) {
            reject(error);
        }

    })
}

let getScheduleDoctorByDate = (doctorId,date) => {
    return new Promise( async (resolve, reject) => {
        try {
            if( !doctorId || !date ){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let data = await db.Schedule.findAll({
                    where: {
                        doctorId :doctorId, 
                        date : date,
                    } ,
                    include: [
                        { model: db.Allcode, as: 'timeTypeData', attributes: ['valueVi','valueEn']  },
                        { model: db.User, as: 'doctorData', attributes: ['firstName','lastName'] ,
                            include: [
                                {model: db.Doctor_Info, attributes: ['addressClinic','nameClinic'] }
                            ]},
                    ],
                    raw: false,
                    nest: true,
                })
                if( !data ) data= [];

            resolve({
                errCode: 0,
                data: data
            })    
            }

        } catch (error) {
            reject(error);
        }
    })
}

let getExtraInfoDoctor = (doctorId) => {
    return new Promise( async (resolve, reject) => {
        try {
            if( !doctorId ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let data = await db.Doctor_Info.findOne({
                    where: { doctorId: doctorId },
                    attributes: {
                        exclude: ['id','doctorId'] 
                    },
                    include: [
                        { model: db.Allcode , as: 'priceTypeData', attributes: ['valueVi','valueEn']},
                        { model: db.Allcode , as: 'paymentTypeData', attributes: ['valueVi','valueEn']},
                        { model: db.Allcode , as: 'provinceTypeData', attributes: ['valueVi','valueEn']},
                    ],
                    raw: false,
                    nest: true
                })
                if(!data) data={};
                resolve({
                    errCode: 0, 
                    data : data
                });
            }

        } catch (error) {
            reject(error);
        }
    })
}

let getProfileDoctor = (inputId) => {
    return new Promise( async (resolve, reject) => {
        try {
            if( !inputId ){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId
                    } , 
                    attributes: {
                        exclude: ['password'] // loai bo di thuoc tinh password
                    },
                    include: [
                        { model: db.Markdown , 
                            attributes: ['description','contentHTML','contentMarkdown']
                        },
                        { model: db.Doctor_Info , 
                            attributes: { 
                                exclude : ['id','doctorId'] 
                            },
                            include: [
                                { model: db.Allcode , as: 'priceTypeData', attributes: ['valueVi','valueEn']},
                                { model: db.Allcode , as: 'paymentTypeData', attributes: ['valueVi','valueEn']},
                                { model: db.Allcode , as: 'provinceTypeData', attributes: ['valueVi','valueEn']},
                            ]
                        },

                        { model: db.Allcode, as: 'positionData', attributes: ['valueVi','valueEn']  },
                    ],
                    raw: false,
                    nest: true
                })
                if(data && data.image){ 
                    data.image = Buffer.from(data.image,'base64').toString('binary'); // convert image to base64
                }
                // console.log(data.image);
                if( !data){ data={} }

                resolve({
                    errCode: 0,
                    data: data
                })

            }

        } catch (error) {
            reject(error);
        }
    })
}

let getListPatient = (doctorId,date) => {
    return new Promise( async (resolve, reject) => {
        try {
            if( !doctorId  || !date ){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let data = await db.Booking.findAll({
                    where: {
                        statusId: 'S2',
                        doctorId:doctorId,
                        date: date,
                    },
                    include: [
                        { 
                            model: db.User, as: 'patientData',attributes: ['email', 'firstName' ,'lastName','address','gender','phonenumber'],
                            include: [
                                { model: db.Allcode, as: 'genderData',attributes: ['valueVi','valueEn'] }  ,
                            ]
                        },
                        {
                            model: db.Allcode, as: 'timeTypeDataPatient',attributes: ['valueVi','valueEn'] 
                        }
                    ],
                    raw: false,
                    nest: true
                })

                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}
let sendPrescription = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if( !data.email || !data.patientId || !data.doctorId || !data.timeType ){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                //update patient status
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        patientId: data.patientId,
                        timeType: data.timeType,
                        statusId: 'S2'
                    },
                    raw: false // to use sequelize save
                })
                if(appointment){
                    appointment.statusId = 'S3';
                    await appointment.save();
                }
                
                //send email prescription
                await emailService.sendAttachment(data);

                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

module.exports ={
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors : getAllDoctors,
    saveInfoDoctor: saveInfoDoctor,
    getDetailDoctor: getDetailDoctor,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleDoctorByDate: getScheduleDoctorByDate,
    getExtraInfoDoctor: getExtraInfoDoctor,
    getProfileDoctor: getProfileDoctor,
    getListPatient: getListPatient,
    sendPrescription,
}