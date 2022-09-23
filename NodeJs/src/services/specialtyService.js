import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';

let createNewSpecailty = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if( !data.name || !data.image || !data.descriptionHTML || !data.descriptionMarkdown ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                });
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.image,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })

                resolve({
                    errCode: 0,
                    errMessage: 'Create Specialty successfully'
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

let getAllSpecialty = () => {
    return new Promise( async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll({
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

let deleteSpecialty = (specialtyId) => {
    return new Promise( async (resolve, reject) => {
        try {
            let specialty = await db.Specialty.findOne({
                where: { id : specialtyId }
            })
            if(!specialty) {
                resolve({
                    errCode:2,
                    errMessage:`The specialty isn't exist`
                })
            }
            // await user.destroy(); khong sd duoc vi da config lai sequelize ra dang object raw o nodejs
            // con ham duoi chay duoc vi xoa truc tiep o db
            await db.Specialty.destroy({
                where: { id : specialtyId }
            })

            resolve({
                errCode:0,
                message:`The specialty was deleted`
            })
            
        } catch (error) {
            reject(error);
        }
    })
}

let updateSpecialty = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if(!data.id){
                resolve({
                    errCode:2,
                    errMessage: 'Missing required parameter'
                })
            }
            
            let specialty = await db.Specialty.findOne({ // where id = data.id
                where: { id : data.id},
                raw: false // tat hien thi object cua sequelize di
            })

           if( specialty){
            specialty.name = data.name;
            specialty.image = data.image;
            specialty.descriptionMarkdown = data.descriptionMarkdown;
            specialty.descriptionHTML = data.descriptionHTML;

            await specialty.save(); // luu vao database , doc docs
                resolve({
                    errCode: 0,
                    message: 'Update user successfully'
                })
           }
           else{
                resolve({
                    errCode: 1,
                    message: 'Update user failed'
                });
           } 
        } catch (e) {
            reject(e);
        }
    })
}

let getDetailSpecialtyById = (inputId , location) => {
    return new Promise( async (resolve, reject) => {
        try {
            if( !inputId || !location ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter',
                })
            } else {

                let data = await db.Specialty.findOne({ 
                    where: { 
                        id : inputId 
                    },
                    attributes: ['descriptionMarkdown','descriptionHTML','image']
                })
                
                let doctorSpecialty = [];
                if( data ){
                    data.image = Buffer.from(data.image,'base64').toString('binary'); // convert image to base64
                    if( location === 'ALL' ){ //find without location
                        let Specialty = await db.Doctor_Info.findAll({
                            where: { specialtyId: inputId},
                            attributes:['doctorId','provinceId'], 
                        })
                        doctorSpecialty = Specialty                    

                    } else { // find with location
                        let Specialty = await db.Doctor_Info.findAll({
                            where: { specialtyId: inputId , provinceId: location },
                            attributes:['doctorId','provinceId']
                        })
                        doctorSpecialty = Specialty                    
                    }
                    
                } else {
                    data = {}
                }
                
                // console.log(doctorSpecialty)
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    data: data,
                    doctorSpecialty: doctorSpecialty
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createNewSpecailty , getAllSpecialty , deleteSpecialty, updateSpecialty , getDetailSpecialtyById
}