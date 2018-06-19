import {
  ADD_EMAIL,
  EDIT_EMAIL,
  DELETE_EMAIL,
  modifyEmailInvitations
} from "../actions/email_invitations";

describe("Email Invitations Actions", () => {
  it("should create an action to add email", () => {
    const addEmail = {
      operation: "add",
      email: "motifworks@lyn.com"
    };
    const expectedAction = {
      type: ADD_EMAIL,
      payload: { id: undefined, email: "motifworks@lyn.com" }
    };
    expect(modifyEmailInvitations(addEmail)).toEqual(expectedAction);
  });

  it("should create an action to edit email", () => {
    const editEmail = {
      operation: "edit",
      id: "id1",
      email: "motifworks@motifworks.com"
    };
    const expectedAction = {
      type: EDIT_EMAIL,
      payload: { id: "id1", email: "motifworks@motifworks.com" }
    };
    expect(modifyEmailInvitations(editEmail)).toEqual(expectedAction);
  });

  it("should create an action to delete email", () => {
    const deleteEmail = {
      operation: "delete",
      id: "id1",
      email: "motifworks@motifworks.com"
    };
    const expectedAction = {
      type: DELETE_EMAIL,
      payload: { id: "id1", email: "motifworks@motifworks.com" }
    };
    expect(modifyEmailInvitations(deleteEmail)).toEqual(expectedAction);
  });
});
