import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    users: [],
    isLoadingGender:false,
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],
    allRequiredDoctorInfo: [],
    allSpecialty: [],
    allClinic: [],

}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START: 
        let copyState = {...state};
        copyState.isLoadingGender = true;
            return {
                ...copyState    
            }
        case actionTypes.FETCH_GENDER_SUCCESS: 
        state.genders = action.data;
        state.isLoadingGender = false;
        // console.log(state);
            return {
                ...state    
            }
        case actionTypes.FETCH_GENDER_FAILED: 
            state.isLoadingGender = true;
            state.genders = [];

            return {
                ...state  
            }   
        case actionTypes.FETCH_POSITION_SUCCESS: 
            state.positions = action.data;
            return {
                ...state    
            }
        case actionTypes.FETCH_POSITION_FAILED: 
            state.positions = [];
            return {
                ...state  
            }       
        case actionTypes.FETCH_ROLE_SUCCESS: 
            state.roles = action.data;
            return {
                ...state    
            }
        case actionTypes.FETCH_ROLE_FAILED: 
            state.roles = [];
            return {
                ...state  
            }  
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.data;
            return {
                ...state  
            } 
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state  
            }      
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.data;
            return {
                ...state  
            }    
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = [];
            return {
                ...state  
            }   
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.data;
            return {
                ...state  
            }   
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = [];
            return {
                ...state  
            }   
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            // console.log(state.allScheduleTime);
            return {
                ...state  
            } 
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            // console.log(state.allScheduleTime);
            return {
                ...state  
            } 
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS:
            // console.log(action);
            state.allRequiredDoctorInfo = action.data;
            return {
                ...state  
            } 
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED:
            state.allRequiredDoctorInfo = [];
            return {
                ...state  
            }
        case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
            state.allSpecialty = action.data;
            return {
                ...state 
            }
        case actionTypes.FETCH_ALL_SPECIALTY_FAILED:
            state.allSpecialty = [];
            return {
                ...state 
            }
        case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
            state.allClinic = action.data;
            return {
                ...state 
            }
        case actionTypes.FETCH_ALL_CLINIC_FAILED:
            state.allClinic = [];
            return {
                ...state 
            }


        default:
            return state;
    }
}

export default adminReducer;