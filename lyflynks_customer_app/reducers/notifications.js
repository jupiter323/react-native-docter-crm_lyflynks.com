const INITIAL_STATE = {
  id: 0,
  byId: {},
  unread: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "save_notification":
      const nextByIdNotifications = {
        ...state.byId,
        [++state.id]: action.payload.data
      };
      return { ...state, ["byId"]: nextByIdNotifications, ["unread"]: ++state.unread };
    case "reduce_unread_notifications":
      debugger;
      return { ...state, ["unread"]: 0 };
    default:
      return state;
  }
};
