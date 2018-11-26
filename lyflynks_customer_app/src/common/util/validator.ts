import validate from "validate.js";
import { CONSTRAINTS } from "./constraints";

export const validator = (inputElementName, value) => {
  const validationAttribute = {};
  validationAttribute[inputElementName] = value;
  const errorMessage = validate(validationAttribute, CONSTRAINTS);
  return errorMessage[inputElementName] === undefined
    ? null
    : errorMessage[inputElementName][0];
};

export const confirmPasswordValidator = (password) => {
  const errorMessage = validate(password, CONSTRAINTS)
  console.log(errorMessage)
  return errorMessage["confirmPassword"]
}

export const emailInviteValidator = (emailInvite, value) => {
  if (value == "") return "";
  else {
    const errorMessage = validate({ emailInvite: value }, CONSTRAINTS);
    return errorMessage[emailInvite] === undefined
      ? ""
      : errorMessage[emailInvite][0];
  }
};
