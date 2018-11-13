import { check_in } from "../api/LyfLynks_API";

export const CHECK_IN_ADDED = 'CHECK_IN_ADDED';

export const checkIn = (payload, token, callback) => {
    return async (dispatch) => {
        try {
            const response = await check_in.createCheckIn(payload, token);
            dispatch({ type: CHECK_IN_ADDED, payload: { ...payload, id: response.id } });
            callback();
        } catch (error) {
            console.log(error, 'error');
        }
    }
}