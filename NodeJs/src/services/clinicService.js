import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';

let createNewClinic = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if( !data.name || !data.address || !data.image || !data.descriptionHTML || !data.descriptionMarkdown ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                });
            } else {
                await db.Clinic.create({
                    name: data.name,
                    image: data.image,
                    address: data.address,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Create clinic successfully'
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

let getAllClinic = () => {
    return new Promise( async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll({
                // attributes: {
                //     exclude: ['image']
                // }
            });
            if(data && data.length > 0) {
                data.map( item => {
                    item.image = Buffer.from(item.image,'base64').toString('binary'); // convert image to base64
                    return item;
                })
            }
            // console.log(data);
            resolve({
                errCode: 0,
                errMessage: 'OK',
                data
            })

        } catch (error) {
            reject(error);
        }
    })
}

let deleteClinic = (clinicId) => {
    return new Promise( async (resolve, reject) => {
        try {
            let clinic = await db.Clinic.findOne({
                where: { id : clinicId }
            })
            if(!clinic) {
                resolve({
                    errCode:2,
                    errMessage:`The clinic isn't exist`
                })
            }
            // await user.destroy(); khong sd duoc vi da config lai sequelize ra dang object raw o nodejs
            // con ham duoi chay duoc vi xoa truc tiep o db
            await db.Clinic.destroy({
                where: { id : clinicId }
            })

            resolve({
                errCode:0,
                message:`The clinic was deleted`
            })
            
        } catch (error) {
            reject(error);
        }
    })
}

let updateClinic = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if(!data.id){
                resolve({
                    errCode:2,
                    errMessage: 'Missing required parameter'
                })
            }
            
            let clinic = await db.Clinic.findOne({ // where id = data.id
                where: { id : data.id},
                raw: false // tat hien thi object cua sequelize di
            })

           if( clinic){
            clinic.name = data.name;
            clinic.address = data.address;
            clinic.image = data.image;
            clinic.descriptionMarkdown = data.descriptionMarkdown;
            clinic.descriptionHTML = data.descriptionHTML;

            await clinic.save(); // luu vao database , doc docs
                resolve({
                    errCode: 0,
                    message: 'Update clinic successfully'
                })
           }
           else{
                resolve({
                    errCode: 1,
                    message: 'Update clinic failed'
                });
           } 
        } catch (e) {
            reject(e);
        }
    })
}

let getDetailClinicById = (inputId) => {
    return new Promise( async (resolve, reject) => {
        try {
            if( !inputId ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                })
            } else {

                let data = await db.Clinic.findOne({ 
                    where: { 
                        id : inputId 
                    },
                    attributes: ['name', 'address' ,'descriptionMarkdown','descriptionHTML','image']
                })
                
                let doctorClinic = [];
                if( data ){
                    data.image = Buffer.from(data.image,'base64').toString('binary'); // convert image to base64
                    let Clinic = await db.Doctor_Info.findAll({
                        where: { clinicId: inputId},
                        attributes:['doctorId','provinceId']
                    })
                    doctorClinic = Clinic
                
                } else {
                    data = {}
                }

                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    data: data,
                    doctorClinic: doctorClinic
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createNewClinic , getAllClinic , deleteClinic, updateClinic , getDetailClinicById
}