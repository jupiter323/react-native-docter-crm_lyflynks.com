import { SHOW_LOADER, HIDE_LOADER } from 'constants';

interface Action {
    type: string,
    payload: any,
}

const initState = {};

const loaderReducer = (state = initState, action: Action) => {
    const { type, payload } = action;
    switch(type) {
        case SHOW_LOADER:
            return { ...state, [payload]: true };
        case HIDE_LOADER:
            return { ...state, [payload]: false };
        default:
            return state;
    }
}

export default loaderReducer;