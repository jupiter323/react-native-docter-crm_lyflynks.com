import {
  UPDATE_INPUT_STATUS,
  NORMAL_STATUS,
  UPDATE_FORM_VALUE,
  UPDATE_ERROR_MESSAGE,
  ACTIVE_STATUS,
  SUCCESS_STATUS,
  ERROR_STATUS
} from "./action";

export const INITIAL_STATE = {
  isFetching: false,
  fullName: "",
  phoneNumber: "",
  zip: "",
  cardNumber: "",
  expMondayYear: "",
  cvv: "",
  errors: {
    fullNameErrorMessage: "",
    phoneNumberErrorMessage: "",
    zipErrorMessage: "",
    cardNumberErrorMessage: "",
    expMondayYearErrorMessage: "",
    cvvErrorMessage: "",
  },
  inputStatus: {
    nameStatus: NORMAL_STATUS,
    phoneNumberStatus: NORMAL_STATUS,
    zipStatus: NORMAL_STATUS,
    cardStatus: NORMAL_STATUS,
    expMondayYearStatus: NORMAL_STATUS,
    cvvStatus: NORMAL_STATUS
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_INPUT_STATUS:
      const inputStatus = {
        ...state.inputStatus,
        [action.payload.prop]: action.payload.value
      };
      return {
        ...state,
        inputStatus
      };
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
    default:
      return state;
  }
};

