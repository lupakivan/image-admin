import { IMAGES, IMAGE } from '../constants/actions';

const initialState = {
    images: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case IMAGES.LOAD_REQUEST:
            return {...state, loading: true}
        case IMAGES.LOAD_SUCCESS:
            return {...state, images: action.payload, loading: false}
        case IMAGE.CREATE_SUCCESS:
            return {
                ...state,
                images: [...state.images, action.payload]
            }
        case IMAGE.DELETE_SUCCESS:
            return {
                ...state,
                images: state.images.filter(image => image.id !== action.payload.id)
            }
        case IMAGE.UPDATE_SUCCESS:
            const { payload } = action;
            const nextState = {...state};
            const index = nextState.images.findIndex(image => image.id === payload.image.id);
            const image = nextState.images[index];

            image.tooltip = payload.image.tooltip;

            return nextState;
        default:
            return state
    }
}

export { rootReducer, initialState };
