const Joi = require("joi");
const {
  nameErrorMessage,
  phoneNumberErrorMessage,
  passwordErrorMessage,
  confirmPasswordErrorMessage,
  emailErrorMessage,
} = require("./errorMessage");

const userSchema = Joi.object({
  userName: Joi.string().min(1).required().messages(nameErrorMessage),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages(phoneNumberErrorMessage),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .required()
    .messages(passwordErrorMessage),
  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .messages(confirmPasswordErrorMessage),
}).with("password", "confirmPassword");

const adminSchema = Joi.object({
  name: Joi.string().min(1).required().messages(nameErrorMessage),
  email: Joi.string().email().required().messages(emailErrorMessage),
  password: Joi.string().min(8).required().messages(passwordErrorMessage),
  confirmPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .messages(confirmPasswordErrorMessage),
  created_at: Joi.date().default(Date.now),
  updated_at: Joi.date().default(Date.now),
  deleted_at: Joi.date().allow(null).default(null),
});

module.exports = { userSchema, adminSchema };
