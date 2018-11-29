import {
  UPDATE_INPUT_STATUS,
  NORMAL_STATUS,
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
    emailphoneNumberStatus: NORMAL_STATUS,
    zipPhoneStatus: NORMAL_STATUS,
    alternativePhoneStatus: NORMAL_STATUS,
    cardNumberStatus: NORMAL_STATUS,
    expMondayYearStatus: NORMAL_STATUS,
    cvvStatus: NORMAL_STATUS
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_INPUT_STATUS:
      return {
        ...state,
        userName: action.data
      };
    default:
      return state;
  }
};
