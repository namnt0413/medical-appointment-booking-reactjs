import db from '../models/index';
require('dotenv').config();
import _ from 'lodash';

let postBookingAppointment = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if( !data.email || !data.doctorId || !data.timeType || !data.date ){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            } else {
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