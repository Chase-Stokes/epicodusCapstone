import { firestore } from './../../firebase/utility';

export const handleAddProduct = product => {
    return new Promise((resolve, reject) => {
        firestore.collection('products').doc().set(product)
        .then(() => {resolve}).catch(error => {reject(error)})
    })
}

export const handleFetchProducts = ({ filterType, startAfterDoc, persistProducts=[] }) => {
    return new Promise((resolve, reject) => {
        const pageSize = 6;

        let ref = firestore.collection('products').orderBy('createdDate').limit(pageSize);

        if (filterType) ref = ref.where('productCategory', '==', filterType);
        if (startAfterDoc) ref = ref.startAfter(startAfterDoc); // startAfterDoc is the last item in the page
        ref.get()
        .then(snap => {
            const totalCount = snap.size;
            const data = [
                ...persistProducts,
                ...snap.docs.map(doc => {
                    return {
                        ...doc.data(),
                        documentID: doc.id
                    }
                })
            ];
            resolve({
                data,
                queryDoc: snap.docs[totalCount - 1],
                isLastPage: totalCount < 1 
            });
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

export const handleFetchProduct = productID => {
    return new Promist((resolve, reject) => {
        firestore.collection('products').doc(productID).get()
        .then(snap => {
            if(snap.exists) {
                resolve(
                    snap.data()
                )
            }
        })
        .catch(err => {
            reject(err)
        })
    })
}
