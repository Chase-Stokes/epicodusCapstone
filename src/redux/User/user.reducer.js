import userTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    userError: []
    // signInSuccess: false,
    // signUpSuccess: false,
    // signUpError: [],
    // resetPassword: false,
    // resetPasswordError: []
};

const userReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case userTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                userError: []
            }
        case userTypes.SIGN_OUT_USER_SUCCESS:
            return {
                ...state,
                ...INITIAL_STATE
            } 
        case userTypes.USER_ERROR:
            return {
                ...state,
                userError: action.payload
            }       
        // case userTypes.SET_CURRENT_USER:
        //     return {
        //         ...state,
        //         currentUser: action.payload
        //     }
        // case userTypes.SIGN_IN_SUCCESS:
        //     return {
        //         ...state,
        //         signInSuccess: action.payload
        //     }
        // case userTypes.SIGN_UP_SUCCESS:
        //     return {
        //         ...state,
        //         signUpSuccess: action.payload
        //     }     
        // case userTypes.SIGN_UP_ERROR:
        //     return {
        //         ...state,
        //         signUpError: action.payload
        //     }   
        // case userTypes.RESET_PASSWORD:
        //     return {
        //         ...state,
        //         resetPassword: action.payload
        //     }   
        // case userTypes.RESET_PASSWORD_ERROR:
        //     return {
        //         ...state,
        //         resetPasswordError: action.payload
        //     } 
        // case userTypes.RESET_AUTH:
        //     return {
        //         ...state,
        //         signInSuccess: false,
        //         signUpSuccess: false,
        //         signUpError: [],
        //         resetPassword: false,
        //         resetPasswordError: []
        //     }      
        default:
            return state;
    }
};

export default userReducer;