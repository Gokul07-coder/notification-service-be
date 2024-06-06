const mongoose = require("mongoose");
const { logger } = require("../utils/logger");
const { config } = require("../configs");

class DbConnection {
  dbConnection() {
    mongoose.connect(config.DATABASE_URL);
    mongoose.connection.on("connected", () => {
      console.log("Database connection established");
      logger.info("Database connection established");
    });
    mongoose.connection.on("error", (err) => {
      console.log("Error at connecting DB see logs for more info");
      logger.error("Error in database connection", err);
    });
  }
}

module.exports = () => new DbConnection();
