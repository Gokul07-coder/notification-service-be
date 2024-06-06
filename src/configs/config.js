class Config {
  NODE_ENV = "DEVELOPMENT" | "PRODUCTION" | "STAGE" | "LOCAL";
  constructor(env) {
    this.NODE_ENV = env.NODE_ENV || "DEVELOPMENT";
    this.port = this.getNumber(env.PORT);
    this.DATABASE_URL = env.DATABASE_URL;
    this.SECRET = env.SECRET;
    this.BROKER_URL = env.BROKER_URL;
    // this.MQTT_CLIENT_USERNAME = env.MQTT_CLIENT_USERNAME;
    // this.MQTT_CLIENT_PASSWORD = env.MQTT_CLIENT_PASSWORD;
    // this.MQTT_CLIENT_ID = env.MQTT_CLIENT_ID;
  }

  getNumber(value) {
    return Number(value);
  }
}

module.exports = Config;
