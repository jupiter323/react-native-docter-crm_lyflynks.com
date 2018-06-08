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
