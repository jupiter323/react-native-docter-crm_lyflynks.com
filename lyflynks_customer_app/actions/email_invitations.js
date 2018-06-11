import _ from "lodash";

export const ADD_EMAIL = "add_email";
export const EDIT_EMAIL = "edit_email";
export const DELETE_EMAIL = "delete_email";

export const modifyEmailInvitations = ({ operation, id, email }) => {
  switch (operation) {
    case "add":
      return {
        type: "ADD_EMAIL",
        payload: { id, email }
      };
    case "edit":
      return {
        type: "EDIT_EMAIL",
        payload: { id, email }
      };
    case "delete":
      return {
        type: "DELETE_EMAIL",
        payload: { id, email }
      };
  }
};

normalizeEmailInvitations = emailInvitaions => {};

export const sendEmailInvitations = emails => async dispatch => {
  dispatch({ type: SENDING_EMAIL_INVITATIONS });
  try {
    let response = await emailInvitaions.send(emails);
    dispatch({ type: EMAIL_INIVITATIONS_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: EMAIL_INIVITATIONS_FAILURE });
  }
};
