import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import {rootReducer, initialState} from "./reducers";
import rootSaga from './sagas';
import logger from 'redux-logger';
import 'bootstrap/dist/css/bootstrap.min.css'

import fetchStub from "./utils/fetchStub"

import './index.css';
import App from './components/App';

// stub api calls here
window.fetch = fetchStub;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware, logger),
)

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
