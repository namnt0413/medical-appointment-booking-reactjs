import db from '../models/index';
import bcrypt from 'bcryptjs';

let handleUserLogin = (email, password) => {
    return new Promise( async(resolve, reject) => {
        try {
            let userData = {};
            let isEmailExist = await checkUserEmail(email);
            if (isEmailExist) {
                // neu ton tai email thi so sanh pass
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true,
                })
                // tim kiem user da dki email, show ra cac thuoc tinh,  duoi dang ha`ng

                if( user ){
                    // Cách 1: dùng asynchronous (bất đồng bộ)
                    let check = await bcrypt.compare(password, user.password);


                    // Cách 2: dùng synchronous  (đồng bộ)
                    // let check = bcrypt.compareSync(password, user.password);

                    if(check){
                        userData.errCode = 0;
                        userData.errMessage = "Login Successful";

                        delete user.password; // de tranh bi lo password
                        userData.user = user;
                    }
                    else{
                        userData.errCode = 3;
                        userData.errMessage = "Incorrect password";
                    }
                }
                else {
                    userData.errCode = 2;
                    userData.errMessage = "User not found";
                }
            }
            else {
                userData.errCode = 1;
                userData.errMessage = "Your email isn't exist";
            }
            resolve(userData);

        } catch (e) {
            reject(e);
        }
    })

}

let checkUserEmail = (userEmail) => {
    return new Promise( async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            
            if (user) {
                resolve(true);
            }
            else {
                resolve(false);
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise( async (resolve, reject) => {
        try {
            let users = '';
            if( userId === 'ALL' ){
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password'] // loai bo di thuoc tinh password
                    }
                })      
            }
            if( userId && userId !== 'ALL' ) {
                users = await db.User.findOne({
                    where: { id: userId} , 
                    attributes: {
                        exclude: ['password'] // loai bo di thuoc tinh password
                    }
                })
            }

            resolve(users);

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


const salt = bcrypt.genSaltSync(10);
let createNewUser = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            // check if email already exists
            let check = await checkUserEmail(data.email);
            if( check ) {
                resolve({
                    errCode : 1, 
                    message : 'Your email already exists'
                })
            }
            else {
                let hashPassWordFromBcrypt = await hashUserPassword(data.password) // encrypted password
                await db.User.create({
                    email: data.email, 
                    password: hashPassWordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender, 
                    roleId: data.roleId,
                    phonenumber: data.phonenumber,
                    positionId: data.positionId
                })
                resolve({
                    errCode: 0,
                    message: 'Add successfull'
                });
            }


        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise( async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id : userId }
            })
            if(!user) {
                resolve({
                    errCode:2,
                    errMessage:`The user isn't exist`
                })
            }
            // await user.destroy(); khong sd duoc vi da config lai sequelize ra dang object raw o nodejs
            // con ham duoi chay duoc vi xoa truc tiep o db
            await db.User.destroy({
                where: { id : userId }
            })

            resolve({
                errCode:0,
                message:`The user was deleted`
            })

        } catch (e) {
            reject(e);
        }


    })
}

let editUser = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if(!data.id){
                resolve({
                    errCode:2,
                    errMessage: 'Missing required parameter'
                })
            }
            
            let user = await db.User.findOne({ // where id = data.id
                where: { id : data.id},
                raw: false // tat hien thi object cua sequelize di
            })

           if( user){
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;

            await user.save(); // luu vao database , doc docs
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

let getAllCode = (typeInput) => {
    return new Promise( async (resolve, reject) => {
        try {
            if( !typeInput ){
                resolve({
                    errCode:1,
                    errMessage:'Missing required parameter'
                });
            }
            else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }


        } catch (error) {
                reject(error);
        }
    })

}

module.exports ={
    handleUserLogin: handleUserLogin,
    checkUserEmail : checkUserEmail,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    editUser: editUser,
    getAllCode: getAllCode,
}