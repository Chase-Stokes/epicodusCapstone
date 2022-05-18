import userTypes from "./user.types";
import { auth, handleUserProfile } from "../../firebase/utility";


export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
});

export const signInUser = ({ email, password }) => async dispatch => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        dispatch({ type: userTypes.SIGN_IN_SUCCESS, payload: true })
    } catch(error) {
        console.log(error)
    }
};

export const signUpUser = ({ displayName, email, password, confirmPassword }) => async dispatch => {
    if(password !== confirmPassword) {
        const error = ['Passwords Dont Match'];
        dispatch({type: userTypes.SIGN_UP_ERROR, payload: error});
        return;
    } else if (password.length < 6) {
        const error = ['Password Must Be At Least 6 Characters'];
        dispatch({type: userTypes.SIGN_UP_ERROR, payload: error});
    }
    try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password)
        await handleUserProfile(user, { displayName });
        dispatch({type: userTypes.SIGN_UP_SUCCESS, payload: true})
    } catch(err) {
        console.log(err);
    }
}