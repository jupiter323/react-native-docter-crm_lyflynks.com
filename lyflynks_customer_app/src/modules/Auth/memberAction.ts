export const UPDATE_FORM_VALUE = "update_form_value";
export const UPDATE_ERROR_MESSAGE = "update_error_message";
export const UPDATE_PREFERRED_DAYS = "update_preferred_days";
export const UPDATE_PREFERRED_TIME = "update_preferred_time";
export const UPDATE_ACTIVITIES = "update_activities";
export const UPDATE_NOTIFICATION_VALUE = "update_notification_value";
export const UPDATE_INPUT_STATUS = "update_input_status";

export const NORMAL_STATUS = 0;
export const ACTIVE_STATUS = 1;
export const SUCCESS_STATUS = 2;
export const ERROR_STATUS = 3;

export const updateMemberFormField = ({ prop, value }) => {
  return {
    type: UPDATE_FORM_VALUE,
    payload: { prop, value }
  };
};
export const updateMemberNotifications = ({prop, value}) =>{
  return {
    type: UPDATE_NOTIFICATION_VALUE,
    payload: { prop, value }
  };
}
export const updateErrorMessage = ({ prop, value }) => {
  return {
    type: UPDATE_ERROR_MESSAGE,
    payload: { prop, value }
  };
};
export const updateInputStatus = ({ prop, value }) => {
  return {
    type: UPDATE_INPUT_STATUS,
    payload: { prop, value }
  };
};
export const updateEntity = ({ entityType, key, selected }) => {
  switch (entityType) {
    case "time":
      return {
        type: UPDATE_PREFERRED_TIME,
        payload: { key, selected }
      };
    case "day":
      return {
        type: UPDATE_PREFERRED_DAYS,
        payload: { key, selected }
      };
    case "activities":
      return {
        type: UPDATE_ACTIVITIES,
        payload: { key, selected }
      };
  }
};
