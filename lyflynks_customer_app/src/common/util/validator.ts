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

export const secondaryPhonenumberValidator = (inputElementName, value) => {
  if (value.trim() == "") return null;
  return validator(inputElementName, value);

}

export const mmyyValidator = (inputElementName, value) => {
  let valueYear = Number(value.split("/", 2)[1]);
  let currentYear = new Date().getFullYear() % 100;
  let currentMonth = new Date().getMonth() + 1;
  let valueMonth = Number(value.split("/", 2)[0]);
  console.log(currentMonth, valueMonth);
  return (valueYear < currentYear) ?
    "Your year is in the past" :
    (valueYear == currentYear && currentMonth > valueMonth) ?
      "Month is in the past" :
      (!valueYear||!valueMonth)?
      "Must be a number":
       validator(inputElementName, value);
}

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
