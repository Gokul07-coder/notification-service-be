const IApp = require("./src/interface/IApp.js");
const express = require("express");
const router = require("./src/routes/index.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  requestLoggerMiddleware,
  rTracer,
  logger,
} = require("./src/utils/logger.js");
const rateLimit = require("express-rate-limit");
const { client } = require("./src/utils/mqtt.js");
const swaggerDocs = require("./src/helper/swagger.js");
const swaggerUi = require("swagger-ui-express");
const authenticate = require("./src/helper/swaggerAuthenticate");


class App extends IApp {
  constructor() {
    super();
    console.log("Express and Middleware Initialized");
    this.app = express();
    this.setUpMiddleware();
    this.setUpRoutes();
    this.setApp();
    client;
  }

  setApp() {
    //API rate limiter
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
      message:
        "Too many requests from this IP, please try again after a while.",
    });
    this.app.use(limiter);
  }

  setUpMiddleware() {
    //for handling JSON through the Application
    this.app.use(express.json());
    //for getting and parsing the body of the request in JSON format
    this.app.use(bodyParser.json());
    //for cors
    this.app.use(cors());
    //for logging
    this.app.use(requestLoggerMiddleware);
    //for trace logging
    this.app.use(rTracer.expressMiddleware());
    this.app.use("/api-docs", authenticate, swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    this.app.use((req, res, next) => {
      const str = ` IP: ${req.ip} Request: ${req.method} ${req.url} ${
        req.body ? "JSON BODY IS INCLUDED" : "NO REQUEST BODY"
      }`;
      logger.info(str);
      next();
    });
  }

  setUpRoutes() {
    this.app.use("/api/v1", router);
  }
}

module.exports = App;
