import {IMAGE} from "../constants/actions"

export const createImage = image => ({
    type: IMAGE.CREATE_REQUEST,
    payload: image
});

export const createImageSuccess = image => ({
    type: IMAGE.CREATE_SUCCESS,
    payload: image
});

export const createImageFailure = err => ({
    type: IMAGE.CREATE_FAILURE,
    payload: err
});

export const deleteImage = id => ({
    type: IMAGE.DELETE_REQUEST,
    payload: { id }
});

export const deleteImageSuccess = id => ({
    type: IMAGE.DELETE_SUCCESS,
    payload: { id }
})

export const deleteImageFailure = err => ({
    type: IMAGE.DELETE_FAILURE,
    payload: err
});

export const updateImage = (data) => ({
    type: IMAGE.UPDATE_REQUEST,
    payload: data
});

export const updateImageSuccess = image => ({
    type: IMAGE.UPDATE_SUCCESS,
    payload: image
})

export const updateImageFailure = err => ({
    type: IMAGE.UPDATE_FAILURE,
    payload: err
});
