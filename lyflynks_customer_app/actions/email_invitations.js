import _ from "lodash";
import { members } from "../api/LyfLynks_API";
export const ADD_EMAIL = "add_email";
export const EDIT_EMAIL = "edit_email";
export const DELETE_EMAIL = "delete_email";

export const SENDING_EMAIL_INVITATIONS = "sending_email_invitations";
export const EMAIL_INIVITATIONS_SENT = "email_invitations_sent";
export const EMAIL_INIVITATIONS_FAILURE = "email_invitations_failure";

const normalizeEmailInvitations = emailInvitaions => {
  const emails = [];
  _.forEach(emailInvitaions, emailInvite => {
    if (emailInvite["email"] != "") emails.push(emailInvite["email"]);
  });
  return emails;
};

export const sendAccountInvite = (data) => {
  return dispatch => {
    try{
    dispatch(members.sendInvites(data))
    }catch (err) {
     dispatch({ type: EMAIL_INIVITATIONS_FAILURE });
    }
  }
}

export const sendEmailInvitations = (emailInvitaions, id) => {
  return dispatch => {
    dispatch({ type: SENDING_EMAIL_INVITATIONS });
    const emails = normalizeEmailInvitations(emailInvitaions);
    const errorEmails = [];
    const arrayOfEmailPromises = emails.map(email => {
      return members.sendInvites({
        id,
        email
      });
    });
    Promise.all(arrayOfEmailPromises)
      .then(function(emailResponses) {
        emailResponses.forEach(response => {
          if (response.success !== true) {
            errorEmails.push(email);
          }
        });
        dispatch({
          type: EMAIL_INIVITATIONS_SENT,
          payload: errorEmails
        });
      })
      .catch(function(error) {
        dispatch({ type: EMAIL_INIVITATIONS_FAILURE });
      });
  };
};

export const modifyEmailInvitations = ({ operation, id, email }) => {
  switch (operation) {
    case "add":
      return {
        type: ADD_EMAIL,
        payload: { id, email }
      };
    case "edit":
      return {
        type: EDIT_EMAIL,
        payload: { id, email }
      };
    case "delete":
      return {
        type: DELETE_EMAIL,
        payload: { id, email }
      };
  }
};

export const updateEmailErrorMessage = ({ id, error }) => {
  return {
    type: "UPDATE_EMAIL_VALIDATION_MESSAGE",
    payload: { id, error }
  };
};
