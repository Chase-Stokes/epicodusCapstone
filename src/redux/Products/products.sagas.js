import {takeLatest, put, all, call} from 'redux-saga/effects';
import { setProducts, fetchProductsStart } from './products.actions';
import productsTypes from './products.types';
import { handleAddProduct, handleFetchProducts, handleDeleteProduct } from './products.helpers';
import { auth } from '../../firebase/utility';

export function* addProduct(
    {payload: {productCategory, productName, productThumbnail, productPrice}}) {
    try {
        const timestamp = new Date();
        yield put(fetchProductsStart());
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

export function* fetchProducts({ payload: { filterType }}) {
    try {
        const products = yield handleFetchProducts({ filterType });
        yield put(setProducts(products));
    }catch(error){
        console.log(error)
    }
}
export function* onFetchProductsStart() {
    yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts)
}

export function* deleteProduct({ payload }) {
    try {
        yield handleDeleteProduct(payload);
        yield put(fetchProductsStart());
    } catch(error) {
        console.log(error)
    }
}

export function* onDeleteProductStart() {
    yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct)
} 

export default function* productsSagas() {
    yield all([
        call(onAddProductStart),
        call(onFetchProductsStart),
        call(onDeleteProductStart)
    ])
};