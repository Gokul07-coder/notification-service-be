const mongoose = require("mongoose");
const { Team } = require("./schema");
const { config } = require("../configs");

// Connect to MongoDB
mongoose
  .connect(config.DATABASE_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error", err));

const rcbData = {
  name: "Royal Challengers Bangalore",
  league: "Indian Premier League",
  players: [
    {
      name: "Virat Kohli",
      role: "Captain",
    },
    {
      name: "AB de Villiers",
      role: "Batsman",
    },
    {
      name: "Yuzvendra Chahal",
      role: "Bowler",
    },
  ],
};

const mumbaiIndiansData = {
  name: "Mumbai Indians",
  league: "Indian Premier League",
  players: [
    {
      name: "Rohit Sharma",
      role: "Captain",
    },
    {
      name: "Jasprit Bumrah",
      role: "Bowler",
    },
    {
      name: "Hardik Pandya",
      role: "All-rounder",
    },
  ],
};

const cskData = {
  name: "Chennai Super Kings",
  league: "Indian Premier League",
  players: [
    { name: "MS Dhoni", role: "Captain", playerId: "456789012345678901234567" },
    {
      name: "Suresh Raina",
      role: "Batsman",
    },
    {
      name: "Ravindra Jadeja",
      role: "All-rounder",
    },
  ],
};

Team.create(rcbData)
  .then((team) => {
    console.log("Royal Challengers Bangalore (RCB) team created:", team);
  })
  .catch((error) => {
    console.error("Error creating RCB team:", error);
  });

Team.create(mumbaiIndiansData)
  .then((team) => {
    console.log("Mumbai Indians team created:", team);
  })
  .catch((error) => {
    console.error("Error creating Mumbai Indians team:", error);
  });

Team.create(cskData)
  .then((team) => {
    console.log("Chennai Super Kings (CSK) team created:", team);
  })
  .catch((error) => {
    console.error("Error creating CSK team:", error);
  })
  .finally(() => {
    mongoose
      .disconnect()
      .then(() => console.log("Disconnected from MongoDB"))
      .catch((err) => console.error("Error disconnecting from MongoDB", err));
  });
