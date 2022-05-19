import { createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import createSagaMiddle from 'redux-saga';
import thunk from 'redux-thunk';
import rootSaga from './rootSaga';
import rootReducer from './rootReducer';

const sagaMiddleware = createSagaMiddle();
export const middlewares = [logger,sagaMiddleware, thunk];
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);//needs to be after store creation

export default store;