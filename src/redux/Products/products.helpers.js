import { firestore } from './../../firebase/utility';

export const handleAddProduct = product => {
    return new Promise((resolve, reject) => {
        firestore.collection('products').doc().set(product)
        .then(() => {resolve}).catch(error => {reject(error)})
    })
}

export const handleFetchProducts = () => {
    return new Promise((resolve, reject) => {
        firestore.collection('products').get().then(snap => {
            const productsArray = snap.docs.map(doc => {
                return {
                    ...doc.data(),
                    documentID: doc.id
                }
            });
            resolve(productsArray);
        }).catch(error => { reject(error) });
    })
}

