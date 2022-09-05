import db from '../models/index';
import user from '../models/user';
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log(data);
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
}


let getAboutPage = (req, res) => {
    return res.render('test/about.ejs'); // render ra about page
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs'); // render
}

let postCRUD = (req, res) => {
    CRUDService.createNewUser(req.body);
    return res.send('post crud from server');
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log('-------------------------------------');
    console.log(data);
    console.log('-------------------------------------');

    return res.render('displayCRUD.ejs', {
        dataTable: data
    })  // truyen bien du lieu thong qua obj dataTable
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;  // lay ra duoc id cua nguoi dung
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        // check user data not found 
        return res.render('editCRUD.ejs', {
            user: userData
        })

    } else {

        return res.send('User not found')
    }
    // console.log(req.query.id);
    // return res.send('User found');

}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    // Sau khi update thi findall user, tra ve allUser va render ra thong qua datatable cua displayCRUD.ejs
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    }); 
}

let deleteCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        await CRUDService.deleteUserData(userId);
        return res.send('delete ok');
        // return res.render('displayCRUD.ejs', {
        //     dataTable: allUsers
        // }); 

    } else {
        return res.send('User not found');
    }
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD : getCRUD,
    postCRUD : postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD : getEditCRUD,
    putCRUD : putCRUD,
    deleteCRUD : deleteCRUD,
}
