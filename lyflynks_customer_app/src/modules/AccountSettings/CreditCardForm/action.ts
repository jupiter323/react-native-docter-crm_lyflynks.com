export const UPDATE_INPUT_STATUS = "update_input_status";
export const UPDATE_FORM_VALUE = "update_input_value";
export const UPDATE_ERROR_MESSAGE = "update_error_message"
export const NORMAL_STATUS = 0;
export const ACTIVE_STATUS = 1;
export const SUCCESS_STATUS = 2;
export const ERROR_STATUS = 3;

export const updateInputStatus = ({ prop, value }) => {
  return {
    type: UPDATE_INPUT_STATUS,
    payload: { prop, value }
  };
};

export const updateMemberFormField = ({ prop, value }) => {
  return {
    type: UPDATE_FORM_VALUE,
    payload: { prop, value }
  };
};

export const updateErrorMessage = ({ prop, value }) => {
  return {
    type: UPDATE_ERROR_MESSAGE,
    payload: { prop, value }
  };
};
