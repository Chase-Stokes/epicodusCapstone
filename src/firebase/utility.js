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

export const handleUserProfile = async (userAuth, data) => {
    if (!userAuth) {
        return
    }

    const { uid } = userAuth;
    const userRef = firestore.doc(`users/${uid}`);
    const awaitRef = await userRef.get();

    if (!awaitRef.exists) {
        const { displayName, email } = userAuth;
        const timestamp = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdDate: timestamp,
                ...data
            })
        } catch(error) {
            console.log(error)
        }
    }
    
    return userRef;
}

