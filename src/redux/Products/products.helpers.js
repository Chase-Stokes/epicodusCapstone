import { firestore } from './../../firebase/utility';

export const handleAddProduct = product => {
    return new Promise((resolve, reject) => {
        firestore.collection('products').doc().set(product)
        .then(() => {resolve}).catch(error => {reject(error)})
    })
}

export const handleFetchProducts = ({ filterType }) => {
    return new Promise((resolve, reject) => {
        let ref = firestore.collection('products').orderBy('createdDate');
        if (filterType) ref = ref.where('productCategory', '==', filterType);

        ref.get()
        .then(snap => {
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

export const handleDeleteProduct = documentID => {
    return new Promise((resolve, reject) => {
        firestore.collection('products').doc(documentID).delete().then(() => {
            resolve();
        }).catch(error => {
            reject(error);
        })
    })
}

