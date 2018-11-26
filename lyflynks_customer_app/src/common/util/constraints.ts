export const CONSTRAINTS = {
  fullName: {
    presence: { allowEmpty: false }
  },
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
  emailInvite: {
    email: true
  },
  primaryPhoneNumber: {
    presence: { allowEmpty: false },
    format: {
      pattern: /^((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/,
      message: 'is xxx-xxx-xxxx format',
    },
    // length: {
    //   is: 10,
    //   message: "^Number should be 10 digits long"
    // },
    // numericality: true
  },
  secondaryPhoneNumber: {
    presence: {
      allowEmpty: true,     
    },
    format: {
      pattern: /^((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/,
      message: 'is xxx-xxx-xxxx format',
    }
    // length: {
    //   is: 10,
    //   message: "^Number should be 10 digits long"
    // },
    // numericality: true

  },
  zipCode: {
    presence: { allowEmpty: false },
    length: {
      is: 5,
      message: "^Zip Code must be exact 5 digits long"
    },
    numericality: true
  },
  password: {
    presence: { allowEmpty: false },
    length: {
      minimum: 6,
      message: "^Password must be at least 6 digits long"
    },
  },
  confirmPassword: { equality: "password" }
};
