import _ from "lodash";
import { members } from '../api/LyfLynks_API'

export const ADD_EMAIL = "add_email";
export const EDIT_EMAIL = "edit_email";
export const DELETE_EMAIL = "delete_email";

export const modifyEmailInvitations = ({ operation, id, email }) => {
  switch (operation) {
    case "add":
      return {
        type: "ADD_EMAIL",
        payload: { id, email }
      };
    case "edit":
      return {
        type: "EDIT_EMAIL",
        payload: { id, email }
      };
    case "delete":
      return {
        type: "DELETE_EMAIL",
        payload: { id, email }
      };
  }
};


export const inviteMember = data => {
  return members.memberInvite(data)
}
