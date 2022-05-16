import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { firebaseConfig } from "./config";
import { signInWithPopup } from 'firebase/compat/auth';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);
// GoogleProvider.addScope('profile');
// GoogleProvider.addScope('email');
// export const googleSignIn = () => auth.signInWithPopUp(GoogleProvider).then(result => { 
//     const token = result.credential.accessToken;
//     const user = result.user
// });


//41:44 timestamp