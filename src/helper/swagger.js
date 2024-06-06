const swaggerjsdoc = require("swagger-jsdoc");
const {} = require("../routes/");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Notification service EXPRESS API",
      version: "1.0.0",
      description:
        "This is an live notification service application containing both ADMIN and USER API's.",
      contact: {
        name: "Gokul",
        email: "mgokul0707@gmail.com",
      },
      servers: [{ url: "http://localhost:4000" }],
    },
  },
  apis: ["../routes/*.js"],
};

const swaggerDocs = swaggerjsdoc(swaggerOptions);

module.exports = swaggerDocs;
