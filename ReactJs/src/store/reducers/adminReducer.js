import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START: 
            return {
                ...state    
            }
        case actionTypes.FETCH_GENDER_SUCCESS: 
        // console.log("check ", action, " and " , state);
        let copyState = { ...state} // copy state rong vao 1 bien moi ( ko nen thay doi state )
        copyState.genders = action.data;
        // console.log(copyState);
            return {
                ...copyState    
            }
        case actionTypes.FETCH_GENDER_FAILED: 
            return {
                ...state    
            }        
        default:
            return state;
    }
}

export default adminReducer;