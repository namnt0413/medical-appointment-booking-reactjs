import axios from '../axios'; // ket noi toi server nodeJS

const handleLoginApi = (userEmail,userPassword) => {
    return axios.post('/api/login', {email : userEmail, password : userPassword} );    
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}` );
    // return axios.get('/api/get-all-users?id=', {data: {id: inputId}} );

}

const createNewUserService = (data) => {
    // console.log('check data from service : ' , data);
    return axios.post('/api/create-new-user',data);
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user',{data: {id: userId} } ); 
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user',inputData); 
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}` );

}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}` );
}

const getAllDoctorService = () => {
    return axios.get(`/api/get-all-doctors`);
}

const saveInfoDoctorService = (data) => {
    return axios.post('/api/save-info-doctor',data)
}

const getDetailInfoDoctor = (doctorId) => {
    return axios.get(`/api/get-detail-doctor?id=${doctorId}`);

}

const bulkCreateSchedule = (data) => {
    return axios.post('/api/bulk-create-schedule/',data);
}

const getScheduleDoctorByDate = (doctorId,date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

export { handleLoginApi , getAllUsers, createNewUserService, deleteUserService, bulkCreateSchedule, getScheduleDoctorByDate,
    editUserService, getAllCodeService, getTopDoctorHomeService,getAllDoctorService,saveInfoDoctorService , getDetailInfoDoctor }









