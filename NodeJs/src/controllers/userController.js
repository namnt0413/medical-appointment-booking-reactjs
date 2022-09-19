import userService from '../services/userService'
// handle login se phai xu ly :
// 1. check email, pw nhap vao    2.check xem email ton tai chua  3.check pass  4. 

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password){
        return res.status(500).json({
            errCode : 1 , message: 'Missing input parameter'
            })
    }

    let userData = await userService.handleUserLogin(email, password);


    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user : userData.user ? userData.user : {}
    })

}

let handleGetAllUsers = async (req, res) => {

    let id = req.query.id; // lay tat ca or 1 nguoi dung : ALL or id = xx bang body hoac query
    let users = await userService.getAllUsers(id);
    // console.log(users);

    if( !id ){ // neu khong truyen id len ( ko phai la ALL hay 1 so )
        return res.status(200).json({
            errCode: 1, 
            errMessage: 'Missing required parameter', 
            users: [],
        })
    }

    return res.status(200).json({
        errCode: 0, 
        errMessage: 'OK', 
        users: users,
    })

}

let handleCreateNewUser = async (req, res) => {

    let message = await userService.createNewUser(req.body);
    // console.log(message);
    return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
    let data = req.body;
    let message = await userService.editUser(data);
    return res.status(200).json(message);
}

let handleDeleteUser = async (req, res) => {
    if( !req.body.id ){
        return res.status(404).json({
            errCode: 1, errMessage: 'Missing required parameter'
        })
    }
    let message = await userService.deleteUser(req.body.id);
    // console.log(message);
    return res.status(200).json(message);
}

let handleGetAllCode = async (req, res) => {
    try {
        setTimeout( async () => {
            let data = await userService.getAllCode(req.query.type);
            // console.log(data);
            return res.status(200).json(data);
        },3000)

    } catch (error) {
        console.log('get allcode error', error);
        return res.status(200).json({
            errCode: -1, errMessage:'Error from server'
        })
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser : handleEditUser,
    handleDeleteUser : handleDeleteUser,
    handleGetAllCode: handleGetAllCode,
}
