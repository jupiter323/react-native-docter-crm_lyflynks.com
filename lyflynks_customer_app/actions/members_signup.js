import { auth } from "../api/LyfLynks_API";

export const SIGNUP_MEMBER = "signup_member";
export const SIGNUP_MEMBER_SUCCESS = "signup_member_success";
export const SIGNUP_MEMBER_FAILURE = "signup_member_failure";

export const signup = details => {
  return async dispatch => {
    dispatch({ type: SIGNUP_MEMBER });
    try {
      let response = await auth.members(details);
      dispatch({ type: SIGNUP_MEMBER_SUCCESS, response });
    } catch (err) {
      dispatch({ type: SIGNUP_MEMBER_FAILURE });
    }
  };
};
