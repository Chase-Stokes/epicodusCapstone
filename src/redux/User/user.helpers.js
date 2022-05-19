import { auth } from './../../firebase/utility';

export const handleResetPassword = (email) => {
    const config = { // this is where the recovery email sends you after they reset their password
        url: 'http://localhost:3000/login'
    }

    return new Promise((resolve, reject) => {
        auth.sendPasswordResetEmail(email, config)
        .then(() => {
            resolve();
        }).catch(() => {
            const error = ['Email not found.']
            reject(error)
        })
    })
}