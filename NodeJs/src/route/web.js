import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from '../controllers/patientController';
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";


let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);

    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    router.get('/api/allcode', userController.handleGetAllCode);

    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctors', doctorController.getAllDoctors);
    router.post('/api/save-info-doctor', doctorController.saveInfoDoctor);
    router.get('/api/get-detail-doctor', doctorController.getDetailDoctor); // component detail doctor
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);
    // router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleDoctorByDate);
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleDoctorByDate);
    router.get('/api/get-extra-info-doctor', doctorController.getExtraInfoDoctor);
    router.get('/api/get-profile-doctor', doctorController.getProfileDoctor); // component info doctor
    router.get('/api/get-list-patient', doctorController.getListPatient); // component info doctor
    router.post('/api/send-prescription', doctorController.sendPrescription);
 
    router.post('/api/post-booking-appointment', patientController.postBookingAppointment);
    router.post('/api/verify-booking-appointment', patientController.postVerifyBookingAppointment);

    router.post('/api/create-new-specialty', specialtyController.createNewSpecailty);
    router.get('/api/get-specialty', specialtyController.getAllSpecialty);
    router.delete('/api/delete-specialty', specialtyController.handleDeleteSpecialty);
    router.put('/api/update-specialty', specialtyController.handleUpdateSpecialty);
    router.get('/api/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById);

    router.post('/api/create-new-clinic', clinicController.createNewClinic);
    router.get('/api/get-clinic', clinicController.getAllClinic);
    router.delete('/api/delete-clinic', clinicController.handleDeleteClinic);
    router.put('/api/update-clinic', clinicController.handleUpdateClinic);
    router.get('/api/get-detail-clinic-by-id', clinicController.getDetailClinicById);


    return app.use("/", router);
}

module.exports = initWebRoutes;