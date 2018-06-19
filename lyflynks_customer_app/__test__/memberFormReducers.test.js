import {
  UPDATE_FORM_VALUE,
  UPDATE_ERROR_MESSAGE,
  UPDATE_PREFERRED_DAYS,
  UPDATE_PREFERRED_TIME
} from "../actions/member_form";
import member_form from "../reducers/member_form";
import { INITIAL_STATE } from "../reducers/member_form";

describe("Member Form Reducer", () => {
  it("should return the initial state", () => {
    expect(member_form(undefined, {})).toEqual(INITIAL_STATE);
  });

  it("should handle changes to update form field values", () => {
    const updatedFirstName = {
      prop: "firstName",
      value: "Anubhav"
    };
    const expectedState = {
      ...INITIAL_STATE,
      firstName: "Anubhav"
    };
    const action = {
      type: UPDATE_FORM_VALUE,
      payload: updatedFirstName
    };
    expect(member_form(undefined, action)).toEqual(expectedState);
  });

  it("should handle updates to error messages", () => {
    const updatedErrorMessage = {
      prop: "emailErrorMessage",
      value: "This is not a valid email"
    };
    const action = {
      type: UPDATE_ERROR_MESSAGE,
      payload: updatedErrorMessage
    };
    const expectedState = {
      ...INITIAL_STATE,
      errors: {
        ...INITIAL_STATE.errors,
        ["emailErrorMessage"]: "This is not a valid email"
      }
    };
    expect(member_form(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it("should handle updates to preferred days", () => {
    const updatedPreferredDay = {
      key: "monday",
      selected: true
    };
    const action = {
      type: UPDATE_PREFERRED_DAYS,
      payload: updatedPreferredDay
    };
    const expectedState = {
      ...INITIAL_STATE,
      preferredDays: {
        ...INITIAL_STATE.preferredDays,
        ["monday"]: { title: "Monday", selected: true }
      }
    };
    expect(member_form(INITIAL_STATE, action)).toEqual(expectedState);
  });

  it("should handle update to preferred time", () => {
    const updatedPreferredTime = {
      key: "morning",
      selected: true
    };
    const action = {
      type: UPDATE_PREFERRED_TIME,
      payload: updatedPreferredTime
    };
    const expectedState = {
      ...INITIAL_STATE,
      preferredTime: {
        ...INITIAL_STATE.preferredTime,
        ["morning"]: { title: "Morning", selected: true }
      }
    };
    expect(member_form(INITIAL_STATE, action)).toEqual(expectedState);
  });
});
