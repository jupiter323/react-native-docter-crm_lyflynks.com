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
  phone: {
    presence: { allowEmpty: false },
    format: {
      pattern: /^((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/,
      message: 'is xxx-xxx-xxxx',
    }
  },
  primaryPhoneNumber: {
    presence: { allowEmpty: false },
    format: {
      pattern: /^((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/,
      message: 'is xxx-xxx-xxxx format',
    }
  },
  secondaryPhoneNumber: {
    presence: {
      allowEmpty: true,
    },
    format: {
      pattern: /^((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/,
      message: 'is xxx-xxx-xxxx format',
    }

  },
  zipCode: {
    presence: { allowEmpty: false },
    length: {
      is: 5,
      message: "^Zip Code must be exact 5 digits long"
    },
    numericality: true,
  },

  cardNumber: {
    presence: { allowEmpty: false },
    format: {
      pattern: /^(34|37|4|5[1-5]).*$/,
      message: "is not a valid credit card number"
    },
    length: function (value, attributes, attributeName, options, constraints) {
      if (value) {
        // Amex
        if ((/^(34|37).*$/).test(value)) return {
          is: 18,
          message: "must be exact 15 digits long"

        };
        // Visa, Mastercard
        if ((/^(4|5[1-5]).*$/).test(value.trim())) return {
          is: 19,
          message: "must be exact 16 digits long"
        };
      }
      // Unknown card, don't validate length
      return false;
    }

  },
  expMondayYear: {
    presence: {
      allowEmpty: false,
      message: "^MM/YY can't be blank"

    },
    length: {
      minimum: 5,
      message: "^Fill in the MM/YY"
    },
  },
  cvv: {
    presence: {
      allowEmpty: false,
      message: "^CVV can't be blank"
    },
    length: {
      minimum: 4,
      message: "^Must be exact 4 digits"
    },
    numericality: true,
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
