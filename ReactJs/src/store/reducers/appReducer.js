import actionTypes from '../actions/actionTypes';

const initContentOfConfirmModal = {
    isOpen: false,
    messageId: "",
    handleFunc: null,
    dataFunc: null
}

const initialState = {
    started: true,
    language: 'en',
    isShowLoading: "",
    // systemMenuPath: '/system/dashboard',
    systemMenuPath: '/home',
    contentOfConfirmModal: {
        ...initContentOfConfirmModal
    }
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.APP_START_UP_COMPLETE: 
            return {
                ...state,
                started: true
            }
        case actionTypes.SET_CONTENT_OF_CONFIRM_MODAL: 
            return {
                ...state,
                contentOfConfirmModal: {
                    ...state.contentOfConfirmModal,
                    ...action.contentOfConfirmModal
                }
            }    
        case actionTypes.CHANGE_LANGUAGE: 
            // console.log('check redux : ',action);
            return {
                ...state,
                language: action.language, // sau khi fire action, redux se chay vao appReducer de thuc hien hd
            }

        case actionTypes.CHANGE_IS_SHOW_LOADING: 
        console.log('check show loading : ',action);
            let copyState = {...state};
            copyState.isShowLoading = action.isShowLoading;
            return {
                ...copyState,
            }

        default:
            return state;
    }
}

export default appReducer;