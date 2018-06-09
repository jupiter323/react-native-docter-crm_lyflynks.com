const INITITAL_STATE = {
  count: 2,
  invitations: {
    id1: { id: "id1", email: "" },
    id2: { id: "id2", email: "" }
  }
};

export default (state = INITITAL_STATE, action) => {
  debugger;
  switch (action.type) {
    case "add_email":
      const nextCount = state.count + 1;
      const newInvitations = {
        ...state.invitations,
        [`id${nextCount}`]: { id: `id${nextCount}`, email: "" }
      };
      return { ...state, count: nextCount, invitations: newInvitations };
    case "edit_email":
      const inviteToEdit = state.invitations[action.payload.id];
      const updatedInvite = { ...inviteToEdit, email: action.payload.email };
      const updatedInvitations = {
        ...state.invitations,
        [action.payload.id]: updatedInvite
      };
      return { ...state, updatedInvitations };
    case "delete_email":
      const {
        [`id${action.payload.id}`]: email,
        nextInvitations
      } = state.invitations;
      return { ...state, invitations: newInvitations };
    default:
      return state;
  }
};
