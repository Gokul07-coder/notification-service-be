const nameErrorMessage = {
  "string.base": "Username must be a string",
  "string.empty": "Username is required",
  "any.required": "Username is required",
};

const phoneNumberErrorMessage = {
  "string.pattern.base": "Phone number must be exactly 10 digits",
  "string.empty": "Phone number is required",
  "any.required": "Phone number is required",
};

const passwordErrorMessage = {
  "string.pattern.base":
    "Password must contain at least one letter, one number, and one special character",
  "string.min": "Password must be at least 8 characters long",
  "string.empty": "Password is required",
  "any.required": "Password is required",
};

const confirmPasswordErrorMessage = {
  "any.only": "Confirm password does not match password",
  "any.required": "Confirm password is required",
};

const emailErrorMessage = {
  "string.base": "Email must be a string",
  "string.email": "Email must be a valid email",
  "string.empty": "Email is required",
  "any.required": "Email is required",
};

module.exports = {
  nameErrorMessage,
  phoneNumberErrorMessage,
  passwordErrorMessage,
  confirmPasswordErrorMessage,
  emailErrorMessage,
};
