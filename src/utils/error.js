const { logger } = require("../utils/logger");

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }

  handleError = (error, res) => {
    console.log(error);
    logger.error(error);

    if (error instanceof CustomError) {
      console.log(error.message, error.statusCode);
      res.status(error.statusCode).send({ error: error.message });
    } else {
      res.send({ error: "Internal Server Error ", statusCode: 500 });
    }
  };
}

module.exports = CustomError;
