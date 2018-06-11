export const CONSTRAINTS = {
  firstName: {
    presence: { allowEmpty: false }
  },
  lastName: {
    presence: { allowEmpty: false }
  },
  userName: {
    presence: { allowEmpty: false }
  },
  email: {
    presence: {
      message: "^Please enter an email address"
    },
    email: true
  },
  primaryPhoneNumber: {
    presence: { allowEmpty: false },
    length: {
      minimum: 10,
      message: "^Number must be at least 10 digits long"
    },
    numericality: true
  },
  zipCode: {
    presence: { allowEmpty: false },
    length: {
      minimum: 6,
      message: "^Zip Code must be at least 6 digits long"
    },
    numericality: true
  }
};
