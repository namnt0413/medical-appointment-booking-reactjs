import actionTypes from './actionTypes';
import { getAllCodeService , createNewUserService , getAllUsers , deleteUserService, deleteSpecialtyService, getAllSpecialty,
     editUserService ,getTopDoctorHomeService , getAllDoctorService, saveInfoDoctorService, getAllClinic, deleteClinicService } from '../../services/userService';
import { toast } from 'react-toastify';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart =() => {
    // type: actionTypes.FETCH_GENDER_START
    return async (dispatch,getState) => {
        try {
            dispatch({type: actionTypes.FETCH_GENDER_START})
            let res = await getAllCodeService("GENDER");
            if( res && res.errCode === 0 ){
                dispatch(fetchGenderSuccess(res.data));
            }
            else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            console.log('fetch gender start error : ', error);
            dispatch(fetchGenderFailed());
        }
    }
}

export const fetchPositionStart =() => {
    // type: actionTypes.FETCH_GENDER_START
    return async (dispatch,getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if( res && res.errCode === 0 ){
                dispatch(fetchPositionSuccess(res.data));
            }
            else {
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            console.log('fetch position start error : ', error);
            dispatch(fetchPositionFailed());
        }
    }
}

export const fetchRoleStart =() => {
    // type: actionTypes.FETCH_GENDER_START
    return async (dispatch,getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if( res && res.errCode === 0 ){
                dispatch(fetchRoleSuccess(res.data));
            }
            else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            console.log('fetch role start error : ', error);
            dispatch(fetchRoleFailed());
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionSuccess = (positionData) => ({
    type : actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type : actionTypes.FETCH_POSITION_FAILED,
})

export const fetchRoleSuccess = (roleData) => ({
    type : actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type : actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch,getState) => {
        try {
            let res = await createNewUserService(data) ;
            console.log(res) ;
            if( res && res.errCode === 0 ){
                toast.success("Create a new user success!")
                dispatch(createUserSuccess());
                dispatch(fetchAllUsersStart());
            }
            else {
                dispatch(createUserFailed());
            }
        } catch (error) {
            console.log('error : ', error);
            dispatch(createUserFailed());
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})


export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUsersStart = () => {
    return async (dispatch,getState) => {
        try {
            let res = await getAllUsers('ALL');
            if( res && res.errCode === 0 ){
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            }
            else {
                dispatch(fetchAllUsersFailed());
                toast.error("Get all users failed!")

            }
        } catch (error) {
            console.log('fetch role start error : ', error);
            toast.error("Get all users failed!")
            dispatch(fetchAllUsersFailed());
        }
    }
}

export const fetchAllUsersSuccess = (userData) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data: userData
})


export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const deleteUser = (userId) => {
    return async (dispatch,getState) => {
        try {
            let res = await deleteUserService(userId) ;
            // console.log(res) ;
            if( res && res.errCode === 0 ){
                toast.success("Delete user success!")
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            }
            else {
                toast.error("Delete user failed!")
                dispatch(deleteUserFailed());
            }
        } catch (error) {
            console.log('error : ', error);
            toast.error("Delete user failed!")
            dispatch(deleteUserFailed());
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const updateUser = (data) => {
    return async (dispatch,getState) => {
        try {
            let res = await editUserService(data) ;
            // console.log(res) ;
            if( res && res.errCode === 0 ){
                toast.success("Update user success!")
                dispatch(updateUserSuccess());
                dispatch(fetchAllUsersStart());
            }
            else {
                toast.error("Update user failed!")
                dispatch(updateUserFailed());
            }
        } catch (error) {
            console.log('error : ', error);
            toast.error("Update user failed!")
            dispatch(deleteUserFailed());
        }
    }
}

export const updateUserSuccess = () => ({
    type: actionTypes.UPDATE_USER_SUCCESS
})

export const updateUserFailed = () => ({
    type: actionTypes.UPDATE_USER_FAILED
})

export const fetchTopDoctors = () => {
    return async (dispatch,getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            // console.log(res);
            if( res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({ type: actionTypes.FETCH_TOP_DOCTORS_FAILED})
            }
        } catch (error) {
            dispatch({ type: actionTypes.FETCH_TOP_DOCTORS_FAILED})            
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch,getState) => {
        try {
            let res = await getAllDoctorService();
            // console.log(res);
            if( res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    data: res.data
                })
            }
            else {
                dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_FAILED})
            }
        } catch (error) {
            dispatch({ type: actionTypes.FETCH_ALL_DOCTORS_FAILED})            
        }
    }
}

export const saveInfoDoctor = (data) => {
    return async (dispatch,getState) => {
        try {
            let res = await saveInfoDoctorService(data);
            console.log(res);
            if( res && res.errCode === 0){
                toast.success("Save doctor info success!")
                dispatch({
                    type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS
                })
            }
            else {
                toast.error("Save doctor info failed!")
                dispatch({ type: actionTypes.SAVE_INFO_DOCTOR_FAILED})
            }
        } catch (error) {
            toast.error("Save doctor info failed!")
            dispatch({ type: actionTypes.SAVE_INFO_DOCTOR_FAILED})            
        }
    }
}

export const FetchAllScheduleTime = () => {
    return async (dispatch,getState) => {
        try {
            let res = await getAllCodeService("TIME");
            // console.log(res);
            if( res && res.errCode === 0){
                // toast.success("Save doctor info success!")
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            }
            else {
                // toast.error("Save doctor info failed!")
                dispatch({ type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED})
            }
        } catch (error) {
            // toast.error("Save doctor info failed!")
            dispatch({ type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED})
        }
    }
}

export const getRequiredDoctorInfo =() => {
    // type: actionTypes.FETCH_GENDER_START
    return async (dispatch,getState) => {
        try {
            dispatch({type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START})
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic();

            if( resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0 &&
                resSpecialty && resSpecialty.errCode === 0 &&
                resClinic && resClinic.errCode === 0 
                ){
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data,
                }
                dispatch(getRequiredDoctorInfoSuccess(data));
            }
            else {
                dispatch(getRequiredDoctorInfoFailed());
            }
        } catch (error) {
            console.log('fetch gender start error : ', error);
            dispatch(getRequiredDoctorInfoFailed());
        }
    }
}

export const getRequiredDoctorInfoSuccess = (allRequiredDoctorInfo) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
    data: allRequiredDoctorInfo
})

export const getRequiredDoctorInfoFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED
})

export const fetchAllSpecialty = () => {
    return async (dispatch,getState) => {
        try {
            let res = await getAllSpecialty();
            // console.log(res);
            if( res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
                    data: res.data.reverse()
                })
            }
            else {
                dispatch({ type: actionTypes.FETCH_ALL_SPECIALTY_FAILED})
            }
        } catch (error) {
            dispatch({ type: actionTypes.FETCH_ALL_SPECIALTY_FAILED})            
        }
    }
}

export const deleteSpecialty = (specialtyId) => {
    return async (dispatch,getState) => {
        try {
            let res = await deleteSpecialtyService(specialtyId) ;
            // console.log(res) ;
            if( res && res.errCode === 0 ){
                toast.success("Delete specialty success!")
                dispatch(deleteSpecialtySuccess());
                dispatch(fetchAllSpecialty());
            }
            else {
                toast.error("Delete specialty failed!")
                dispatch(deleteSpecialtyFailed());
            }
        } catch (error) {
            console.log('error : ', error);
            toast.error("Delete specialty failed!")
            dispatch(deleteSpecialtyFailed());
        }
    }
}

export const deleteSpecialtySuccess = () => ({
    type: actionTypes.DELETE_SPECIALTY_SUCCESS
})

export const deleteSpecialtyFailed = () => ({
    type: actionTypes.DELETE_SPECIALTY_FAILED
})


export const fetchAllClinic = () => {
    return async (dispatch,getState) => {
        try {
            let res = await getAllClinic();
            // console.log(res);
            if( res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
                    data: res.data.reverse()
                })
            }
            else {
                dispatch({ type: actionTypes.FETCH_ALL_CLINIC_FAILED})
            }
        } catch (error) {
            dispatch({ type: actionTypes.FETCH_ALL_CLINIC_FAILED})            
        }
    }
}

export const deleteClinic = (clinicId) => {
    return async (dispatch,getState) => {
        try {
            let res = await deleteClinicService(clinicId) ;
            // console.log(res) ;
            if( res && res.errCode === 0 ){
                toast.success("Delete clinic success!")
                dispatch(deleteClinicSuccess());
                dispatch(fetchAllClinic());
            }
            else {
                toast.error("Delete clinic failed!")
                dispatch(deleteClinicFailed());
            }
        } catch (error) {
            console.log('error : ', error);
            toast.error("Delete clinic failed!")
            dispatch(deleteClinicFailed());
        }
    }
}

export const deleteClinicSuccess = () => ({
    type: actionTypes.DELETE_CLINIC_SUCCESS
})

export const deleteClinicFailed = () => ({
    type: actionTypes.DELETE_CLINIC_FAILED
})