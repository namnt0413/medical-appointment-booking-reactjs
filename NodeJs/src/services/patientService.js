import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';
import emailService from './emailService'

let postBookingAppointment = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if( !data.email || !data.doctorId || !data.timeType || !data.date
                || !data.fullName
                ){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
                console.log(data)
                await emailService.sendSimpleEmail({
                    receiveEmail : data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    clinicName: 'Phòng khám đa khoa Hà Đông',
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: 'https://www.youtube.com/channel/UC_1kFQESd4UZHc1Rcn1tmWg'
                })
                
                // find user and create a new user if not exist
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    }
                })

                // create a booking record
                if( user && user[0] ){          //user tra ve 2 phan tu, [0] la thong tin user, [1] la bien boolean check isCreated? 
                    await db.Booking.findOrCreate({
                        where: {patientId: user[0].id },
                        defaults: {
                            doctorId: data.doctorId,
                            statusId: 'S1',
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
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

module.exports = {
    postBookingAppointment
}