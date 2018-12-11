import _ from "lodash";
import members from "../../modules/Auth/memberApi";
export const ADD_EMAIL = "add_email";
export const EDIT_EMAIL = "edit_email";
export const DELETE_EMAIL = "delete_email";

export const SENDING_EMAIL_INVITATIONS = "sending_email_invitations";
export const EMAIL_INIVITATIONS_SENT = "email_invitations_sent";
export const EMAIL_INIVITATIONS_FAILURE = "email_invitations_failure";
export const EMAIL_INIVITATIONS_UPDATE = "email_invitations_update";

export const sendAccountInvite = (data) => {
  return async dispatch => {
    try {
      console.log(data);
      dispatch({ type: EMAIL_INIVITATIONS_UPDATE });
      const response = await members.sendInvites(data)
      dispatch(memberAccountSuccess(response));
      console.log('sendAccountInvite end');
    } catch (err) {
      console.log(err);
      dispatch({ type: EMAIL_INIVITATIONS_FAILURE });
    }
  };
};
 

export const sendAccountInvite1 = (data,token) => {
  return async dispatch => {
    try {
      console.log('invite member function called');
      dispatch(memberAccountSuccess(await members.sendInvites(data,token)));
    } catch (err) {
      console.log('Error Return');
      console.log(err);
      dispatch({ type: EMAIL_INIVITATIONS_FAILURE });
    }
  };
};

const normalizeEmailInvitations = emailInvitaions => {
  const emails = [];
  _.forEach(emailInvitaions, emailInvite => {
    if (emailInvite["email"] != "") emails.push(emailInvite["email"]);
  });
  return emails;
};

export const sendEmailInvitations = (emailInvitaions, token) => {
  return dispatch => {
    dispatch({ type: SENDING_EMAIL_INVITATIONS });
    const emails = normalizeEmailInvitations(emailInvitaions);
    const errorEmails = [];
    const arrayOfEmailPromises = emails.map(email => {
      return members.sendInvites({
        token,
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

function memberAccountSuccess(errorEmails) {
  console.log("==errorEmails==");
  console.log(errorEmails);
  if (errorEmails.success != true) {
    return {
      type: EMAIL_INIVITATIONS_FAILURE,
      payload: errorEmails
    };
  }
  return {
    type: EMAIL_INIVITATIONS_SENT,
    payload: errorEmails
  };
}