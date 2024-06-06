class IServer {
  constructor() {
    if (this.constructor === IServer) {
      throw new Error("Cannot instantiate interface");
    }
  }

  startServer() {
    throw new Error("Method 'startServer()' must be implemented.");
  }

  dbConnection() {
    throw new Error("Method 'dbConnection()' must be implemented.");
  }

  sample() {
    throw new Error("Method 'sample()' must be implemented.");
  }
}

module.exports = IServer;
