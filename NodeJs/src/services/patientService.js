import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';
import emailService from './emailService'
import { v4 as uuidv4 } from 'uuid';

let buildUrlEmail = (doctorId,token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}` ;
    return result;
}

let postBookingAppointment = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if( !data.email || !data.doctorId || !data.timeType || !data.date
                || !data.fullName || !data.address || !data.phoneNumber || !data.selectedGender
                ){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let token = uuidv4();
                
                await emailService.sendSimpleEmail({
                    receiveEmail : data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    clinicName: data.nameClinic ,
                    clinicAddress: data.addressClinic,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId,token)
                })
                
                // find user and create a new user if not exist
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        lastName: data.fullName,
                        address: data.address,
                        phonenumber : data.phoneNumber,
                        gender: data.selectedGender
                    }
                })
                
                // create a booking record
                if( user && user[0] ){          //user tra ve 2 phan tu, [0] la thong tin user, [1] la bien boolean check isCreated? 
                    console.log(user[0])
                    await db.Booking.findOrCreate({
                        where: {patientId: user[0].id , doctorId: data.doctorId },
                        defaults: {
                            doctorId: data.doctorId,
                            statusId: 'S1',
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            timeString: data.timeString,
                            reason: data.reason,
                            token: token,
                        }
                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save booking success',
                })

            }

        } catch (error) {
            reject(error);
        }
    })
}

let postVerifyBookingAppointment = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if( !data.token || !data.doctorId ){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false // de dung update, raw = true thi tra ve 1 object cua Javascript ( ko phai 1 obj cua sequelize de dung save)
                })
                // console.log(appointment)
                if( appointment ) {
                    appointment.statusId = 'S2'
                    await appointment.save()

                    resolve({
                        errCode: 0,
                        errMessage: 'Update the appointment successfully'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Appointment has been activated or does not exist'
                    })
                }


            }

        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    postBookingAppointment,
    buildUrlEmail,
    postVerifyBookingAppointment
}