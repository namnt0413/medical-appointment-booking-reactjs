import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassWordFromBcrypt = await hashUserPassword(data.password) // encrypted password
            await db.User.create({
                email: data.email,
                password: hashPassWordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })
            resolve('create new user succeed');

        } catch (e) {
            reject(e);
        }
    })

}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            //lưu ý, truyền vào đúng password cần hash
            // let hashPassWord = await bcrypt.hashSync("B4c0/\/", salt); => copy paste mà ko edit nè
            let hashPassWord = await bcrypt.hashSync(password, salt);

            resolve(hashPassWord);
        } catch (e) {
            reject(e);
        }

    })
}

let getAllUser = async () => {
    return new Promise((resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise( async(resolve, reject) => {
        try {
            let user = await db.User.findOne({  // bat dong bo do tim user mat t gian
                where:{ id : userId},
                raw: true,
            })

            if(user){
                resolve(user);
            }
            else {
                resolve([]);
            }

        } catch (e) {
            reject(e);
        }
    });
}

let updateUserData = (data) => {
    // console.log(data);
    return new Promise( async(resolve, reject) => {
        try {
            let user = await db.User.findOne({ // where id = data.id
                where: { id : data.id}
            })

           if( user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save(); // luu vao database , doc docs
                
                let allUsers = await db.User.findAll();
                resolve(allUsers);
           }
           else{
                resolve();
           } 

        } catch (e) {
            reject(e);
        }
    });
}


let deleteUserData = (userId) => {
    return new Promise( async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id : userId },
            })
            if(!user) {
                resolve({
                    errCode:2,
                    errMessage:`The user isn't exist`
                })
            }

            await db.User.destroy({
                where: { id : userId }
            })
            resolve(); // = return
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser : getAllUser,
    getUserInfoById : getUserInfoById,
    updateUserData : updateUserData,
    deleteUserData : deleteUserData,
}