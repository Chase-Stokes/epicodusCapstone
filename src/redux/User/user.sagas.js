import { takeLatest, call, all, put } from 'redux-saga/effects';
import userTypes from "./user.types";
import { signInSuccess, signOutUserSuccess, userError } from './user.actions';
import { auth, handleUserProfile, getCurrentUser, GoogleProvider } from "../../firebase/utility";


export function* getUserAuthSnap(user, data={}) {
    try {
        const userRef = yield call(handleUserProfile, {userAuth: user, data});
        const snap = yield userRef.get();
        yield put(signInSuccess({
            id : snap.id,
            ...snap.data()
        }))        
    } catch(error) {
        console.log(error)
    }
}

export function* emailSignIn({ payload: {email, password} }) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getUserAuthSnap(user)
        // 
        // dispatch({ type: userTypes.SIGN_IN_SUCCESS, payload: true })
    } catch(error) {
        console.log(error)
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* isUserAuth() {
    try {
        const userAuth = yield getCurrentUser();
        if(!userAuth) {
            return
        }
        yield getUserAuthSnap(userAuth)
    } catch(error){
        console.log(error)
    }
}

export function* onCheckUserSignIn() {
    yield takeLatest(userTypes.CHECK_USER_SIGN_IN, isUserAuth);
}

export function* signOutUser() {
    try {
        yield auth.signOut();
        yield put(signOutUserSuccess())
    } catch(error) {
        console.log(error)
    }
}

export function* onSignOutUserStart() {
    yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser)
}

export function* signUpUser({ payload: { displayName, email, password, confirmPassword}}) {
    
    if(password !== confirmPassword) {
        const error = ['Passwords Dont Match'];
        yield put(userError(error));
        return;
    } else if (password.length < 6) {
        const error = ['Password Must Be At Least 6 Characters'];
        yield put(userError(error));
        return;
    }
    
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password)
        const data = { displayName };
        yield getUserAuthSnap(user, data)
    } catch(err) {
        console.log(err);
    }
}

export function* onSignUpUserStart() {
    yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser)
}

export default function* userSagas() {
    yield all([
        call(onEmailSignInStart), 
        call(onCheckUserSignIn), 
        call(onSignOutUserStart),
        call(onSignUpUserStart)
    ])
}
