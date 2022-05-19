import {takeLatest, put, all, call} from 'redux-saga/effects';
import { setProducts } from './products.actions';
import productsTypes from './products.types';
import { handleAddProduct, handleFetchProducts } from './products.helpers';
import { auth } from '../../firebase/utility';

export function* addProduct({payload: {productCategory, productName, productThumbnail, productPrice}}) {
    try {
        const timestamp = new Date();
        yield handleAddProduct({
            productCategory, 
            productName, 
            productThumbnail, 
            productPrice, 
            productAdminUID: auth.currentUser.uid,
            createdDate: timestamp
        });
    }catch(error){
        console.log(error)
    }
}

export function* onAddProductStart() {
    yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export function* fetchProducts() {
    try {
        const products = yield handleFetchProducts();
        yield put(setProducts(products));
    }catch(error){
        console.log(error)
    }
}
export function* onFetchProductsStart() {
    yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts)
}

export default function* productsSagas() {
    yield all([
        call(onAddProductStart),
        call(onFetchProductsStart)
    ])
};