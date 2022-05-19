import { takeLatest, call, all, put } from 'redux-saga/effects';
import userTypes from "./user.types";
import { signInSuccess, signOutUserSuccess } from './user.actions';
import { auth, handleUserProfile, getCurrentUser, GoogleProvider } from "../../firebase/utility";


export function* getUserAuthSnap(user) {
    try {
        const userRef = yield call(handleUserProfile, {userAuth: user});
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

export default function* userSagas() {
    yield all([call(onEmailSignInStart), call(onCheckUserSignIn), call(onSignOutUserStart)])
}
