import { auth } from "../api/LyfLynks_API";

export const MEMBER_UPDATE_USERNAME = "MEMBER_UPDATE_USERNAME";
export const MEMBER_UPDATE_PASSWORD = "MEMBER_UPDATE_PASSWORD";

export const MEMBER_LOGIN = "MEMBER_LOGIN";
export const MEMBER_LOGIN_SUCCESS = "MEMBER_LOGIN_SUCCESS";
export const MEMBER_LOGIN_FAILURE = "MEMBER_LOGIN_FAILURE";

export const MEMBER_ACCOUNT_LOGIN = "MEMBER_ACCOUNT_LOGIN";
export const MEMBER_ACCOUNT_LOGIN_SUCCESS = "MEMBER_ACCOUNT_LOGIN_SUCCESS";
export const MEMBER_ACCOUNT_LOGIN_FAILURE = "MEMBER_ACCOUNT_LOGIN_FAILURE";

export function updateLoginForm(text, field) {
  return dispatch => {
    if (field === "username") {
      dispatch(updateUsername(text));
    } else if (field === "password") {
      dispatch(updatePassword(text));
    }
  };
}

export function member(data) {
  debugger;
  return async dispatch => {
    dispatch(authMember());
    try {
      dispatch(authMemberSuccess(await auth.member(data)));
    } catch (err) {
      debugger;
      dispatch(authMemberFailure(err));
    }
  };
}

export function member_account(data, token) {
  return async dispatch => {
    dispatch(authMemberAccount());
    try {
      dispatch(
        authMemberAccountSuccess(await auth.member_account(data, token))
      );
    } catch (err) {
      dispatch(authMemberAccountFailure(err));
    }
  };
}

function updateUsername(text) {
  return { type: MEMBER_UPDATE_USERNAME, text };
}

function updatePassword(text) {
  return { type: MEMBER_UPDATE_PASSWORD, text };
}

function authMember() {
  return { type: MEMBER_LOGIN };
}

function authMemberSuccess(data) {
  debugger;
  return { type: MEMBER_LOGIN_SUCCESS, data };
}

function authMemberFailure(error) {
  return { type: MEMBER_LOGIN_FAILURE, error };
}

function authMemberAccount() {
  return { type: MEMBER_ACCOUNT_LOGIN };
}

function authMemberAccountSuccess(data) {
  return { type: MEMBER_ACCOUNT_LOGIN_SUCCESS, data };
}

function authMemberAccountFailure(error) {
  return { type: MEMBER_ACCOUNT_LOGIN_FAILURE, error };
}

const normalizeEntities = entities =>
  _.filter(entities, entity => {
    if (entity["selected"] === true) {
      return entity["title"];
    }
  });

export const createMember = memberDetails => {
  const normalizedPreferredDays = normalizeEntities(
    memberDetails.preferredDays
  );
  const normalizedPreferredTime = normalizeEntities(
    memberDetails.preferredTime
  );
};
