const Joi = require("joi");
const {
  phoneNumberErrorMessage,
  passwordErrorMessage,
  emailErrorMessage,
} = require("./errorMessage");

const userLoginSchema = Joi.object({
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages(phoneNumberErrorMessage),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .required()
    .messages(passwordErrorMessage),
});

const adminLoginSchema = Joi.object({
  email: Joi.string().email().required().messages(emailErrorMessage),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .required()
    .messages(passwordErrorMessage),
});

module.exports = { userLoginSchema, adminLoginSchema };