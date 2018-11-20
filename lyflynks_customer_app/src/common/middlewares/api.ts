import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { BASE_URL, API, SHOW_LOADER, HIDE_LOADER, SHOW_ERROR, HIDE_ERROR } from 'constants';

const apiMiddleware = ({ dispatch }) => next => async (action) => {
    if (action.type !== API) {
        next(action);
        return;
    }
    
    let { url, method, loader, token, onSuccess, apiKey, success, payload } = action.meta;
    const data = action.payload;
    const fullUrl = `${BASE_URL}${url}`;
    if (loader) dispatch({ type : SHOW_LOADER, payload: apiKey });

    try {
        // const token = await AsyncStorage.getItem('apiToken');
        const options = {
            method,
            url: fullUrl,
        };

        if (data) options.data = data;

        options.headers = { 'x-access-token': token, 'Content-Type': 'application/json' };

        const response = await axios(options);
        
        if (success) {
            dispatch({ type: success, payload });
        }

        onSuccess && onSuccess(response.data);
        if (loader) dispatch({ type : HIDE_LOADER, payload: apiKey });
    } catch (error) {
        console.log(error);
    }
};

export default apiMiddleware;