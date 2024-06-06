const Joi = require("joi");

const messageValidationSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "string.base": "Title should be a type of text",
    "string.empty": "Title cannot be an empty field",
    "string.min": "Title should have a minimum length of {#limit}",
    "string.max": "Title should have a maximum length of {#limit}",
    "any.required": "Title is a required field",
  }),
  message: Joi.string().min(10).max(1000).required().messages({
    "string.base": "Message should be a type of text",
    "string.empty": "Message cannot be an empty field",
    "string.min": "Message should have a minimum length of {#limit}",
    "string.max": "Message should have a maximum length of {#limit}",
    "any.required": "Message is a required field",
  }),
  type: Joi.string()
    .valid("info", "warning", "six", "four", "wicket")
    .required()
    .messages({
      "string.base": "Type should be a type of text",
      "any.only": "Type must be one of [info, warning, six, four, wicket]",
      "any.required": "Type is a required field",
    }),
  teamId: Joi.string().alphanum().length(24).required().messages({
    "string.base": "Team ID should be a type of text",
    "string.empty": "Team ID cannot be an empty field",
    "string.alphanum": "Team ID must only contain alpha-numeric characters",
    "string.length": "Team ID must be exactly {#limit} characters long",
    "any.required": "Team ID is a required field",
  }),
  playerId: Joi.string().alphanum().length(24).allow(null).messages({
    "string.base": "Player ID should be a type of text",
    "string.alphanum": "Player ID must only contain alpha-numeric characters",
    "string.length": "Player ID must be exactly {#limit} characters long",
  }),
});

module.exports = { messageValidationSchema };
