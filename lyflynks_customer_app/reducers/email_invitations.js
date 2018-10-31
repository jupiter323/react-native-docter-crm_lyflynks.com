import {
  ADD_EMAIL,
  EDIT_EMAIL,
  DELETE_EMAIL,
  SENDING_EMAIL_INVITATIONS,
  EMAIL_INIVITATIONS_SENT,
  EMAIL_INIVITATIONS_FAILURE,
  EMAIL_INIVITATIONS_UPDATE
} from "../actions/email_invitations";
import { updateErrorMessage } from "../actions/member_form";

const INITITAL_STATE = {
  count: 1,
  invitations: {
    id1: { id: "id1", email: "", error: "" }
  },
  sendingInvitations: false,
  invitationResponse: null,
  errorEmails: [],
  errorMessage: ""
};

export default (state = INITITAL_STATE, action) => {
  switch (action.type) {
    case ADD_EMAIL:
      const nextCount = state.count + 1;

      const newInvitations = {
        ...state.invitations,
        [`id${nextCount}`]: { id: `id${nextCount}`, email: "", error: "" }
      };

      return {
        ...state,
        count: nextCount,
        invitations: newInvitations
      };

    case EDIT_EMAIL:
      const inviteToEdit = state.invitations[action.payload.id];

      const updatedInvite = {
        ...inviteToEdit,
        email: action.payload.email
      };

      const updatedInvitations = {
        ...state.invitations,
        [action.payload.id]: updatedInvite
      };

      return { ...state, invitations: updatedInvitations };

    case DELETE_EMAIL:
      const { [action.payload.id]: email, ...nextInvitations } = state.invitations;

      return {
        ...state,
        invitations: nextInvitations
      };

    case SENDING_EMAIL_INVITATIONS:
      return {
        ...state,
        sendingInvitations: true
      };

    case EMAIL_INIVITATIONS_SENT:
      return {
        ...INITITAL_STATE,
        invitationResponse: "success",
        sendingInvitations: false,
        errorEmails: action.payload
      };

    case EMAIL_INIVITATIONS_FAILURE:
      return {
        ...state,
        invitationResponse: "failure",
        sendingInvitations: false, 
      };

      case EMAIL_INIVITATIONS_UPDATE:
      return {
        ...state,
        invitationResponse: null,
        sendingInvitations: false,
        errorEmails:[]
      };

    case "UPDATE_EMAIL_VALIDATION_MESSAGE":
      const inviteToUpdateErrorMessage = state.invitations[action.payload.id];

      const inviteWithUpdatedErrorMessage = {
        ...inviteToUpdateErrorMessage,
        error: action.payload.error
      };

      const invitationsWithUpdatedErrorMessages = {
        ...state.invitations,
        [action.payload.id]: inviteWithUpdatedErrorMessage
      };
      return {
        ...state,
        invitations: invitationsWithUpdatedErrorMessages
      };
    default:
      return state;
  }
};
