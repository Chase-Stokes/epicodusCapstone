import userTypes from "./user.types";
import { auth, handleUserProfile, GoogleProvider } from "../../firebase/utility";

export const emailSignInStart = userCredentials => ({
    type: userTypes.EMAIL_SIGN_IN_START,
    payload: userCredentials
});

export const signInSuccess = user => ({
    type: userTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const checkUserSignIn = () => ({
    type: userTypes.CHECK_USER_SIGN_IN
});

// export const setCurrentUser = user => ({
//     type: userTypes.SET_CURRENT_USER,
//     payload: user
// });


export const signOutUserStart = () => ({
    type: userTypes.SIGN_OUT_USER_START
});

export const signOutUserSuccess = () => ({
    type: userTypes.SIGN_OUT_USER_SUCCESS
});

export const signUpUserStart = userCredentials => ({
    type: userTypes.SIGN_UP_USER_START,
    payload: userCredentials
})

export const userError = error => ({type: userTypes.USER_ERROR, payload: error})

// export const signInUser = ({ email, password }) => async dispatch => {
//     try {
//         await auth.signInWithEmailAndPassword(email, password);
//         dispatch({ type: userTypes.SIGN_IN_SUCCESS, payload: true })
//     } catch(error) {
//         console.log(error)
//     }
// };

export const signUpUser = ({ displayName, email, password, confirmPassword }) => async dispatch => {
    
}

export const recoverPassword = ({ email }) => async dispatch => {
    try {
        const config = { // this is where the recovery email sends you after they reset their password
            url: 'http://localhost:3000/login'
        }
        await auth.sendPasswordResetEmail(email, config)
        .then(() => {
            dispatch({ type: userTypes.RESET_PASSWORD, payload: true})
        }).catch(() => {
            const error = ['Email not found.']
            dispatch({ type: userTypes.RESET_PASSWORD_ERROR, payload: error})
        })
        } catch(error){
            // console.log(error);
    }
}

export const signInWithGoogle = () => async dispatch => {
    try {
        await auth.signInWithPopup(GoogleProvider)
        .then(() => {
            dispatch({ type: userTypes.SIGN_IN_SUCCESS, payload: true })
        })
    } catch (error) {
        console.log(error)
    }
};

export const resetAllAuth = () => ({
    type: userTypes.RESET_AUTH
})