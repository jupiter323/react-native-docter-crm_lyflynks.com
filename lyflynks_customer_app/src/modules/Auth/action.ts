import { AsyncStorage } from "react-native";
import Api from './api';

export const MEMBER_UPDATE_USERNAME = "MEMBER_UPDATE_USERNAME";
export const MEMBER_UPDATE_PASSWORD = "MEMBER_UPDATE_PASSWORD";

export const MEMBER_LOGIN = "MEMBER_LOGIN";
export const MEMBER_LOGIN_SUCCESS = "MEMBER_LOGIN_SUCCESS";
export const MEMBER_LOGIN_FAILURE = "MEMBER_LOGIN_FAILURE";

export const MEMBER_ACCOUNT_LOGIN = "MEMBER_ACCOUNT_LOGIN";
export const MEMBER_ACCOUNT_LOGIN_SUCCESS = "MEMBER_ACCOUNT_LOGIN_SUCCESS";
export const MEMBER_ACCOUNT_LOGIN_FAILURE = "MEMBER_ACCOUNT_LOGIN_FAILURE";

export const MEMBER_ACCOUNT_LOGOUT = "MEMBER_ACCOUNT_LOGOUT";

export const MEMBER_LOGOUT = "MEMBER_LOGOUT";
export const SET_USERNAME = "SET_USERNAME";
export const SET_ACCOUNT_ID = 'SET_ACCOUNT_ID';
export const LOGOUT = 'LOGOUT';

export function makeLogout() {
  return {
    type: LOGOUT
  };
}

export function updateLoginForm(text, field) {
  return dispatch => {
    if (field === "username") {
      dispatch(updateUsername(text));
      dispatch(setUsername(text));
    } else if (field === "password") {
      dispatch(updatePassword(text));
    }
  };
}

export function member(data) {
  return async dispatch => {
    AsyncStorage.removeItem('isLogin');
    dispatch(authMember()); 
    try {
      const response = await Api.member(data);

       //AsyncStorage.setItem('isLogin', response.data); 
       //AsyncStorage.setItem('allData', response); 
       

      dispatch(authMemberSuccess(response));
      if(response.success === true) {
        const has_device_token_been_posted = await AsyncStorage.getItem('has_device_token_been_posted');
        const deviceToken = await AsyncStorage.getItem('device_token');
        
        console.log("Get token api call:", AsyncStorage.getItem('device_token'));
        console.log("Get token await api call:", await AsyncStorage.getItem('device_token'));

        if(has_device_token_been_posted == 'false'&& deviceToken != null) {
          console.log('token to call API', deviceToken);
          const postedDeviceTokenSuccess = await Api.send_device_id(deviceToken, response.data);
          if(postedDeviceTokenSuccess.success === true) {
            await AsyncStorage.setItem('has_device_token_been_posted', 'true');
          }
          AsyncStorage.setItem('user_token', response.data);
        }
        else{
          console.log('Not calling api as device token is null');
          
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
}

// export function memberLogout() {
//   return async dispatch => {
//     dispatch(memberAccountLogout());
//     dispatch(authMemberLogout());
//   };
// }

// export function member_account(data, token) {
//   return async dispatch => {
//     dispatch(authMemberAccount());
//     dispatch(setAccountId(data.account_id))
//     try {
//       dispatch(authMemberAccountSuccess(await auth.member_account(data, token)));
//     } catch (err) {
//       console.log(err);
//     }
//   };
// }

function updateUsername(text) {
  return { type: MEMBER_UPDATE_USERNAME, text };
}

function updatePassword(text) {
  return { type: MEMBER_UPDATE_PASSWORD, text };
}

function authMember() {
  return { type: MEMBER_LOGIN };
}

function setUsername(data) {
  return { type: SET_USERNAME, data };
}

function authMemberSuccess(data) {
  if (data.success != true) {
    return authMemberFailure(data);
  }
  return { type: MEMBER_LOGIN_SUCCESS, data };
}

function authMemberFailure(error) {
  return { type: MEMBER_LOGIN_FAILURE, error };
}

// function authMemberAccount() {
//   return { type: MEMBER_ACCOUNT_LOGIN };
// }

// function memberAccountLogout() {
//   return { type: MEMBER_ACCOUNT_LOGOUT };
// }

// function authMemberLogout() {
//   return { type: MEMBER_LOGOUT };
// }

// function authMemberAccountSuccess(data) {
//   return { type: MEMBER_ACCOUNT_LOGIN_SUCCESS, data };
// }

// function authMemberAccountFailure(error) {
//   return { type: MEMBER_ACCOUNT_LOGIN_FAILURE, error };
// }

// function setAccountId (account_id) {
//   return { type: SET_ACCOUNT_ID, account_id };
// }
