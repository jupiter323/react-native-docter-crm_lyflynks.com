import {
  ADD_EMAIL,
  EDIT_EMAIL,
  DELETE_EMAIL,
  SENDING_EMAIL_INVITATIONS,
  EMAIL_INIVITATIONS_SUCCESS,
  EMAIL_INIVITATIONS_FAILURE
} from "../actions/email_invitations";

const INITITAL_STATE = {
  count: 1,
  invitations: {
    id1: { id: "id1", email: "" }
  },
  sentSuccessfully: false
};

export default (state = INITITAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
