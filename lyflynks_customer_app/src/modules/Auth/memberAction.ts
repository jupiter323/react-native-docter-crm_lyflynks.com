export const UPDATE_FORM_VALUE = "update_form_value";
export const UPDATE_ERROR_MESSAGE = "update_error_message";
export const UPDATE_PREFERRED_DAYS = "update_preferred_days";
export const UPDATE_PREFERRED_TIME = "update_preferred_time";
export const UPDATE_ACTIVITIES = "update_activities";

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
