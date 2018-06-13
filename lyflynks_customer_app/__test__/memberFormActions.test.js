import {
  updateMemberFormField,
  updateErrorMessage,
  updateEntity,
  UPDATE_FORM_VALUE,
  UPDATE_ERROR_MESSAGE,
  UPDATE_PREFERRED_TIME,
  UPDATE_PREFERRED_DAYS
} from "../actions/member_form";

describe("Member Form Actions", () => {
  it("should create an action to update the value of the respective field", () => {
    const fieldToUpdate = {
      prop: "firstName",
      value: "Anubhav"
    };
    const expectedAction = {
      type: UPDATE_FORM_VALUE,
      payload: fieldToUpdate
    };
    expect(updateMemberFormField(fieldToUpdate)).toEqual(expectedAction);
  });

  it("should create an action to update the correct error message", () => {
    const errorMessage = {
      prop: "firstNameErrorMessage",
      value: "This field cannot be empty"
    };
    const expectedAction = {
      type: UPDATE_ERROR_MESSAGE,
      payload: errorMessage
    };
    expect(updateErrorMessage(errorMessage)).toEqual(expectedAction);
  });
});

describe("should update the correct entity", () => {
  it("create an action to update time", () => {
    const updatedEntity = {
      entityType: "time",
      key: "earlyMorning",
      selected: false
    };
    const expectedAction = {
      type: UPDATE_PREFERRED_TIME,
      payload: { key: "earlyMorning", selected: false }
    };
    expect(updateEntity(updatedEntity)).toEqual(expectedAction);
  });

  it("create an action to update day", () => {
    const updatedEntity = {
      entityType: "day",
      key: "monday",
      selected: true
    };
    const expectedAction = {
      type: UPDATE_PREFERRED_DAYS,
      payload: { key: "monday", selected: true }
    };
    expect(updateEntity(updatedEntity)).toEqual(expectedAction);
  });
});
