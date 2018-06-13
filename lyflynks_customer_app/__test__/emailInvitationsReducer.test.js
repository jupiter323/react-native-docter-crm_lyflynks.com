import email_invitations from "../reducers/email_invitations";
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

describe("Email Invitations Reducer", () => {
  it("should handle addition of an email", () => {
    const email = {
      type: ADD_EMAIL,
      payload: {
        id: undefined,
        email: undefined
      }
    };
    const expectedState = {
      ...INITITAL_STATE,
      count: 2,
      invitations: {
        ...INITITAL_STATE.invitations,
        id2: { id: "id2", email: "" }
      }
    };
    expect(email_invitations(INITITAL_STATE, email)).toEqual(expectedState);
  });

  it("should handle edit of an email", () => {
    const email = {
      type: EDIT_EMAIL,
      payload: {
        id: "id1",
        email: "life@lyn.com"
      }
    };
    const expectedState = {
      ...INITITAL_STATE,
      count: 1,
      invitations: {
        ...INITITAL_STATE.invitations,
        id1: { id: "id1", email: "life@lyn.com" }
      }
    };
    expect(email_invitations(INITITAL_STATE, email)).toEqual(expectedState);
  });

  it("should handle deletion of an email", () => {
    const email = {
      type: DELETE_EMAIL,
      payload: {
        id: "id1",
        email: "life@lyn.com"
      }
    };
    const expectedState = {
      ...INITITAL_STATE,
      count: 1,
      invitations: {}
    };
    expect(email_invitations(INITITAL_STATE, email)).toEqual(expectedState);
  });
});
