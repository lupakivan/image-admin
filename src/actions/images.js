import {IMAGES} from "../constants/actions"

export const loadImages = () => ({
    type: IMAGES.LOAD_REQUEST,
});

export const loadImagesSuccess = images => ({
    type: IMAGES.LOAD_SUCCESS,
    payload: images
});

export const loadImagesFailure = err => ({
    type: IMAGES.LOAD_SUCCESS,
    payload: err
});

