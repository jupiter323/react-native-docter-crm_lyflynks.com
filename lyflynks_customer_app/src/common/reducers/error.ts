import { SHOW_ERROR, HIDE_ERROR } from 'constants';

interface Action {
    type: string,
    payload: any,
}

const initState = {};

const errorReducer = (state = initState, action: Action) => {
    const { type, payload } = action;
    switch(type) {
        case SHOW_ERROR:
            return { ...state, [payload]: true };
        case HIDE_ERROR:
            return { ...state, [payload]: false };
        default:
            return state;
    }
}

export default errorReducer;