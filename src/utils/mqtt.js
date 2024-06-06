const mqtt = require("mqtt");
const { config } = require("../configs");

const options = {
  // Clean session
  clean: true,
  keepalive: 60 * 60,
  connectTimeout: 1000,
  username: "ENTERPRISE BOT",
  password: "Qwer1234!@#$",
  // Enable the SSL/TLS, whether a client verifies the server's certificate chain and host name
  rejectUnauthorized: false,
  protocol: "mqtt",
};

const client = mqtt.connect(config.BROKER_URL, options);

client.on("connect", () => {
  console.log("Connected to MQTT broker");
});

module.exports = { client };
