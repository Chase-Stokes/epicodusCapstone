import { all, call } from 'redux-saga/effects';
import userSagas from './User/user.sagas';
import productsSagas from './Products/products.sagas';

//function* creates generator function which produces a sequence of results instead of a single value
export default function* rootSaga() {
    yield all([call(userSagas), call(productsSagas)])
}