import {
  UPDATE_FORM_VALUE,
  UPDATE_ERROR_MESSAGE,
  UPDATE_PREFERRED_DAYS,
  UPDATE_PREFERRED_TIME
} from "../actions/member_form";

import {
  CREATING_ACCOUNT,
  ACCOUNT_CREATION_SUCCESS,
  ACCOUNT_CREATION_FAILURE
} from "../actions/accounts";

export const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  primaryPhoneNumber: "",
  secondaryPhoneNumber: "",
  zipCode: "",
  role: "caregiver",
  preferredDays: {
    monday: { title: "Monday", selected: false },
    tuesday: { title: "Tuesday", selected: false },
    wednesday: { title: "Wednesday", selected: false },
    thursday: { title: "Thursday", selected: false },
    friday: { title: "Friday", selected: false },
    saturday: { title: "Saturday", selected: false },
    sunday: { title: "Sunday", selected: false }
  },
  preferredTime: {
    morning: { title: "Morning", selected: false },
    earlyAfternoon: { title: "Early Afternoon", selected: false },
    evening: { title: "Evening", selected: false }
  },
  errors: {
    firstNameErrorMessage: true,
    lastNameErrorMessage: "",
    userNameErrorMessage: "",
    emailErrorMessage: "",
    primaryPhoneNumberErrorMessage: "",
    zipCodeErrorMessage: ""
  },
  creatingAccount: null,
  accountCreated: null,
  token: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_FORM_VALUE:
      return {
        ...state,
        [action.payload.prop]: action.payload.value
      };

    case UPDATE_ERROR_MESSAGE:
      const errors = {
        ...state.errors,
        [action.payload.prop]: action.payload.value
      };
      return {
        ...state,
        errors
      };
    case UPDATE_PREFERRED_DAYS:
      const dayToEdit = state.preferredDays[action.payload.key];

      const updatedDay = {
        ...dayToEdit,
        selected: action.payload.selected
      };

      const updatedPreferredDays = {
        ...state.preferredDays,
        [action.payload.key]: updatedDay
      };

      return { ...state, preferredDays: updatedPreferredDays };

    case UPDATE_PREFERRED_TIME:
      const timeToEdit = state.preferredTime[action.payload.key];

      const updatedTime = {
        ...timeToEdit,
        selected: action.payload.selected
      };

      const updatedpreferredTime = {
        ...state.preferredTime,
        [action.payload.key]: updatedTime
      };

      return {
        ...state,
        preferredTime: updatedpreferredTime
      };
    case CREATING_ACCOUNT:
      return { ...state, creatingAccount: true };
    case ACCOUNT_CREATION_SUCCESS:
      return {
        ...state,
        accountCreated: "success",
        token: action.payload,
        creatingAccount: false
      };
    case ACCOUNT_CREATION_FAILURE:
      return {
        ...state,
        accountCreated: "failure",
        token: null,
        creatingAccount: false
      };
    default:
      return state;
  }
};
