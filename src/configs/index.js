const dotenv = require("dotenv");
dotenv.config();

const path = require("path");

if (!process.env.NODE_ENV) {
  dotenv.config({ path: path.resolve(process.cwd(), ".env") });
} else if (process.env.NODE_ENV === "STAGE") {
  dotenv.config({ path: path.resolve(process.cwd(), "../../.env.stage") });
} else {
  dotenv.config({ path: path.resolve(process.cwd(), ".env") });
}

const Config = require("./config");
const config = new Config(process.env);

module.exports = { config };
