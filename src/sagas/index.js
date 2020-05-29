import { put, takeLatest, all, call } from 'redux-saga/effects';

import { IMAGES, IMAGE } from "../constants/actions";
import {
    createImageSuccess,
    createImageFailure,
    deleteImageSuccess,
    deleteImageFailure,
    updateImageFailure, updateImageSuccess,
} from "../actions/image";
import {loadImagesSuccess, loadImagesFailure} from '../actions/images'

function* fetchImages() {
    try {
        const res = yield call(fetch, 'https://api.com/images');
        const images = yield res.json();

        yield put(loadImagesSuccess(images));
    } catch (e) {
        loadImagesFailure(e);
    }
}

function* createImage(action) {
    try {
        const { payload } = action;
        const data = new FormData();

        data.append('file', payload.data);
        data.append('tooltipText', payload.tooltip.text);
        data.append('tooltipPosition', payload.tooltip.position);
        data.append('tooltipBgColor', payload.tooltip.bgColor);
        data.append('tooltipTextColor', payload.tooltip.textColor);

        const res = yield call(fetch, 'https://api.com/images', { method: 'POST', body: data });

        if(res.status !== 201) {
            yield put(createImageFailure({ message: 'something went wrong' }));
        }

        const body = yield res.json();

        yield call(payload.history.push, '/');
        yield put(createImageSuccess(body))
    } catch (e) {
        yield put(createImageFailure(e));
    }
}

function* deleteImage(action) {
    try {
        const id = action.payload.id;
        const res = yield call(fetch, `https://api.com/images/${id}`, { method: 'DELETE' });

        if(res.status !== 200) {
            yield put(deleteImageFailure({ message: 'something went wrong' }));
        }

        yield put(deleteImageSuccess(id));
    } catch (e) {
        yield put(deleteImageFailure(e));
    }
}

function* updateImage(action) {
    try {
        const { id, ...imageData } = action.payload.image;
        const res = yield call(fetch, `https://api.com/images/${id}`, { method: 'PUT', body: imageData });

        if(res.status !== 200) {
            yield put(updateImageFailure({ message: 'something went wrong' }))
        }

        const data = yield res.json();

        yield call(action.payload.history.push, '/');
        yield put(updateImageSuccess(data));
    } catch (e) {
        yield put(updateImageFailure(e));
    }
}

function* actionWatcher() {
    yield takeLatest(IMAGES.LOAD_REQUEST, fetchImages)
    yield takeLatest(IMAGE.CREATE_REQUEST, createImage)
    yield takeLatest(IMAGE.DELETE_REQUEST, deleteImage)
    yield takeLatest(IMAGE.UPDATE_REQUEST, updateImage)
}

export default function* () {
    yield all([
        actionWatcher(),
    ])
}
