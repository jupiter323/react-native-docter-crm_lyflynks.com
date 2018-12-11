import check_in  from "./api";
import { API, POST, DELETE, PATCH } from 'constants';

export const CHECK_IN_ADDED = 'CHECK_IN_ADDED';
export const REMOVE_CHECKIN = 'REMOVE_CHECKIN';

export const checkIn = (payload: any, token: string, callback: any) => {
    return (dispatch: any) => {
        dispatch({
            type: API,
            meta: {
                url: '/activities/check_in',
                token,
                method: POST,
                onSuccess: (response: any) => {
                    dispatch({ type: CHECK_IN_ADDED, payload: { ...payload, id: response.id } });
                    callback();
                }
            },
            payload,
        });    
    }
};

export const cancelCheckIn = (id: string, token: string) => ({
    type: API,
    meta: {
        url: `/activity/check_in/${id}`,
        token: token,
        method: PATCH,
        success: REMOVE_CHECKIN,
        payload: id,
    },
    payload: {
        activity: {
            status: 'cancelled'
        },
        activity_fin:{},
        check_in:{}
    }
});

export const updateCheckIn = (id: string, payload: any, token: string, callback: any) => ({
    type: API,
    meta: {
        url: '/activity/check_in/' + id,
        token,
        method: PATCH,
        onSuccess: callback
    },
    payload
});