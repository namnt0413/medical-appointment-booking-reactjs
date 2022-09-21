import axios from '../axios'; // ket noi toi server nodeJS

const getListPatient = (data) => {
    return axios.get(`/api/get-list-patient?doctorId=${data.doctorId}&date=${data.date}`)
}


export {
    getListPatient ,
}