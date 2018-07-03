import { accounts } from "../api/LyfLynks_API";
import _ from "lodash";

export const CREATING_ACCOUNT = "creating_account";
export const ACCOUNT_CREATION_SUCCESS = "account_creation_success";
export const MEMBER_ACCOUNT_CREATION_SUCCESS = "member_account_creation_success";
export const ACCOUNT_CREATION_FAILURE = "account_creation_failure";
export const UPDATE_USER_CREDENTIALS = "upadte_user_credentials";

const normalizeEntities = entities => {
  const selectedEntities = [];
  _.forEach(entities, entity => {
    if (entity["selected"] === true) {
      selectedEntities.push(entity["title"]);
    }
  });
  return selectedEntities;
};

export const signUp = memberDetails => {
  return dispatch => {
    dispatch({ type: CREATING_ACCOUNT });
    const normalizedPreferredDays = normalizeEntities(
      memberDetails.preferredDays
    );
    const normalizedPreferredTime = normalizeEntities(
      memberDetails.preferredTime
    );
    const { errors, ...memberWithoutErrors } = memberDetails;

    const normalizedMember = {
      fname: memberWithoutErrors["firstName"],
      lname: memberWithoutErrors["lastName"],
      email: memberWithoutErrors["email"],
      primaryPhoneNumber: memberWithoutErrors["primaryPhoneNumber"],
      secondaryPhoneNumber: memberWithoutErrors["secondaryPhoneNumber"],
      role: memberWithoutErrors["role"],
      zipcode: +memberWithoutErrors["zipCode"],
      preferredDays: normalizedPreferredDays,
      preferredTime: normalizedPreferredTime
    };

    accounts
      .createAccount(normalizedMember)
      .then(function(response) {
        if (response.success == true) {
          dispatch({ type: ACCOUNT_CREATION_SUCCESS, payload: response.data });
        } else {
          dispatch({ type: ACCOUNT_CREATION_FAILURE });
        }
      })
      .catch(function(error) {
        dispatch({ type: ACCOUNT_CREATION_FAILURE });
      });
  };
};

export const signUpAccount = (memberDetails, userToken) => {
  return dispatch => {
    dispatch({ type: CREATING_ACCOUNT });
    const normalizedActivities = normalizeEntities(
      memberDetails.activities
    );
    
    dispatch({ type: UPDATE_USER_CREDENTIALS, memberDetails });

    const { errors, ...memberWithoutErrors } = memberDetails;

    const normalizedMember = {
      fname: memberWithoutErrors["firstName"],
      lname: memberWithoutErrors["lastName"],
      username: memberWithoutErrors["userName"],
      email: memberWithoutErrors["userName"],
      password: memberWithoutErrors["password"],
      primaryPhoneNumber: memberWithoutErrors["primaryPhoneNumber"],
      secondaryPhoneNumber: memberWithoutErrors["secondaryPhoneNumber"],
      relationship: memberWithoutErrors["relationship"],
      activities: normalizedActivities
    };
    accounts
      .createMemberAccount(normalizedMember, userToken)
      .then(function(response) {
        if (response.success == true) {
          dispatch({ type: MEMBER_ACCOUNT_CREATION_SUCCESS, data: response });
        } else {
          dispatch({ type: ACCOUNT_CREATION_FAILURE });
        }
      })
      .catch(function(error) {
        dispatch({ type: ACCOUNT_CREATION_FAILURE });
      });
  };
};
