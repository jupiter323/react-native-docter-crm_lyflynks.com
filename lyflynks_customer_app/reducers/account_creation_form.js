import {
  UPDATE_FORM_VALUE,
  UPDATE_ERROR_MESSAGE
} from "../actions/member_form";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  primaryPhoneNumber: "",
  secondaryPhoneNumber: "",
  zipCode: "",
  role: "",
  prefferdDay: "",
  prefferedTime: "",
  errors: {
    firstNameErrorMessage: true,
    lastNameErrorMessage: "",
    userNameErrorMessage: "",
    emailErrorMessage: "",
    primaryPhoneNumberErrorMessage: "",
    zipCodeErrorMessage: ""
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_FORM_VALUE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case UPDATE_ERROR_MESSAGE:
      const errors = {
        ...state.errors,
        [action.payload.prop]: action.payload.value
      };
      return { ...state, errors };
    default:
      return state;
  }
};
