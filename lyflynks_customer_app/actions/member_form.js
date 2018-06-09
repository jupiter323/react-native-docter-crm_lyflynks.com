export const UPDATE_FORM_VALUE = "update_form_value";
export const UPDATE_ERROR_MESSAGE = "update_error_message";

export const updateFormValue = ({ prop, value }) => {
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

export const modifyEmailInvitations = ({ operation, id, email }) => {
  switch (operation) {
    case "add":
      return {
        type: "add_email",
        payload: { id, email }
      };
    case "edit":
      return {
        type: "edit_email",
        payload: { id, email }
      };
    case "delete":
      return {
        type: "add_email",
        payload: { id, email }
      };
  }
};
