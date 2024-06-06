const App = require("./app");
const IServer = require("./src/interface/IServer");
const { logger } = require("./src/utils/logger");
const { config } = require("./src/configs");
const dbConnection = require("./src/db/dbConnection")();

class Server extends IServer {
  constructor() {
    super();
    this.app = new App();
    this.startServer();
    this.dbConnection();
  }

  dbConnection() {
    dbConnection.dbConnection();
  }

  startServer() {
    this.app.app.listen(config.port || 4000, (err) => {
      if (err) {
        console.log("Error in starting server");
        logger.error("Error in starting server", err);
      }
      console.log("Access Server on  http://localhost:4000");
      logger.info("Server Started");
    });
  }
}

const server = new Server();
// server.startServer();
