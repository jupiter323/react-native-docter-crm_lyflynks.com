import {
  ADD_EMAIL,
  EDIT_EMAIL,
  DELETE_EMAIL
} from "../actions/email_invitations";

const INITITAL_STATE = {
  count: 1,
  invitations: {
    id1: { id: "id1", email: "" }
  }
};

export default (state = INITITAL_STATE, action) => {
  switch (action.type) {
    case "ADD_EMAIL":
      const nextCount = state.count + 1;
      const newInvitations = {
        ...state.invitations,
        [`id${nextCount}`]: { id: `id${nextCount}`, email: "" }
      };
      return { ...state, count: nextCount, invitations: newInvitations };
    case "EDIT_EMAIL":
      const inviteToEdit = state.invitations[action.payload.id];
      const updatedInvite = { ...inviteToEdit, email: action.payload.email };
      const updatedInvitations = {
        ...state.invitations,
        [action.payload.id]: updatedInvite
      };
      return { ...state, invitations: updatedInvitations };
    case "DELETE_EMAIL":
      const {
        [action.payload.id]: email,
        ...nextInvitations
      } = state.invitations;
      return { ...state, invitations: nextInvitations };
    default:
      return state;
  }
};
