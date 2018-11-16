import check_in  from "./api";
import { API, POST } from 'constants';

export const CHECK_IN_ADDED = 'CHECK_IN_ADDED';

// export const checkIn = (payload, token, callback) => {
//     return async (dispatch) => {
//         try {
//             const response = await check_in.createCheckIn(payload, token);
//             dispatch({ type: CHECK_IN_ADDED, payload: { ...payload, id: response.id } });
//             callback();
//         } catch (error) {
//             console.log(error, 'error');
//         }
//     }
// }

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