const Joi = require("joi");

// Define the validation schema
const idValidationSchema = Joi.object({
  id: Joi.string().alphanum().length(24).required().messages({
    "string.base": "Team ID must be a string",
    "string.empty": "Team ID cannot be an empty field",
    "string.length": "Team ID must be 24 characters long",
    "any.required": "Team ID is a required field",
  }),
});

module.exports = {
  idValidationSchema,
};
