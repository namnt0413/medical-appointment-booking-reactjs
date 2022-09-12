import db from '../models/index';

let getTopDoctorHome = (limitInput) => {
    return new Promise( async (resolve, reject) => {
        try {
            let users = await db.User.findAll({ 
                limit: limitInput,
                order: [['createdAt','DESC']],
                where: { roleId : 'R2' },
                attributes: {
                    exclude: ['password',] // loai bo di thuoc tinh password
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueVi','valueEn']  },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueVi','valueEn']  }
                ],
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

let saveInfoDoctor = (inputData) => {
    return new Promise( async (resolve, reject) => {
        try {
            if(!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown) {
                resolve({
                    errCode:1,
                    errMessage: 'Missing required parameter'
                })
            }
            else {
                await db.Markdown.create({
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    description: inputData.description,
                    doctorId: inputData.doctorId
                }
                ) 
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
                        exclude: ['password','image'] // loai bo di thuoc tinh password
                    },
                    include: [
                        { model: db.Markdown , 
                            attributes: ['description','contentHTML','contentMarkdown']
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueVi','valueEn'] }
                    ],
                    raw: true,
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

module.exports ={
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors : getAllDoctors,
    saveInfoDoctor: saveInfoDoctor,
    getDetailDoctor: getDetailDoctor,
}