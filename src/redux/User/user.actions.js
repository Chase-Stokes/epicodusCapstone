import userTypes from "./user.types";
import { auth } from "../../firebase/utility";


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