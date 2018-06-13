import validate from "validate.js";
import { CONSTRAINTS } from "./constraints";

export const validator = (inputElementName, value) => {
  const validationAttribute = {};
  validationAttribute[inputElementName] = value;
  const errorMessage = validate(validationAttribute, CONSTRAINTS);
  return errorMessage[inputElementName] === undefined
    ? ""
    : errorMessage[inputElementName][0];
};

export const emailInviteValidator = (emailInvite, value) => {
  if (value == "") return "";
  else {
    const errorMessage = validate({ emailInvite: value }, CONSTRAINTS);
    return errorMessage[emailInvite] === undefined
      ? ""
      : errorMessage[emailInvite][0];
  }
};
