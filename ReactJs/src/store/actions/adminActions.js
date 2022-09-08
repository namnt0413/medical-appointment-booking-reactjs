import actionTypes from './actionTypes';
import { getAllCodeService } from '../../services/userService';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart =() => {
    // type: actionTypes.FETCH_GENDER_START
    return async (dispatch,getState) => {
        try {
            dispatch({type: actionTypes.FETCH_GENDER_START})
            let res = await getAllCodeService("gender");
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
            let res = await getAllCodeService("position");
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
            let res = await getAllCodeService("role");
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
