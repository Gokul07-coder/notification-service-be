const e = require("cors");
const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  phone_number: { type: String, required: true },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  is_logged: { type: Boolean, default: false },
  fav_team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  fav_player: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

const adminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

const teamSchema = new Schema({
  name: { type: String, required: true },
  league: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
  players: [
    {
      name: { type: String, required: true },
      role: { type: String, required: true },
    },
  ],
});

const notificationSchema = new Schema({
  title: { type: String, required: true },
  team_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  player_id: { type: mongoose.Schema.Types.ObjectId, default: null },
  type: {
    type: String,
    enum: ["info", "warning", "six", "four", "wicket"],
    required: true,
  },
  message: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

const eventSchema = new Schema({
  user_ids: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }],
  notification_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Notification",
    default: null,
  },
  status: { type: Boolean, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Team = mongoose.model("Team", teamSchema);
const Notification = mongoose.model("Notification", notificationSchema);
const Event = mongoose.model("Event", eventSchema);

module.exports = {
  User,
  Admin,
  Team,
  Notification,
  Event
};
