import { combineReducers } from "redux";
import userReducer from "./User/user.reducer";
import productReducer from './Products/products.reducers';

export default combineReducers({
    user: userReducer,
    productData: productReducer
});