export const UPDATE_INPUT_STATUS = "update_input_status";

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
