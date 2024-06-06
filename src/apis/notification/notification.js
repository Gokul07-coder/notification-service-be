const CustomError = require("../../utils/error");
const customError = new CustomError();
const {
  messageValidationSchema,
} = require("../../validation/notificationValidation");
const {
  Notification: createNotification,
  Team,
  User,
  Event,
} = require("../../db/schema");
const { publishChange } = require("../../helper/mqttHelper");
const { logger } = require("../../utils/logger");

class Notification {
  //create a notification
  async createNotification(req, res) {
    try {
      const { title, message, type, teamId, playerId } = req.body;

      const { error } = messageValidationSchema.validate({
        title,
        message,
        type,
        teamId,
        playerId,
      });

      if (error) {
        throw new CustomError(error.details[0].message, 400);
      }

      //check if the team exists
      const teamCheck = await Team.findOne({ _id: teamId });
      if (!teamCheck) {
        throw new CustomError("Team not found", 404);
      }

      //check if the player exists
      if (playerId) {
        const playerCheck = await Team.findOne({
          players: {
            $elemMatch: { _id: playerId },
          },
        });
        if (!playerCheck) {
          throw new CustomError("Player not found", 404);
        }
      }

      const notification = new createNotification({
        title: title,
        message: message,
        type: type,
        team_id: teamId,
        player_id: playerId,
        updated_at: Date.now(),
      });

      // Save the notification
      await notification.save();

      // Get all users subscribed to the team
      const users = await User.find({ fav_team: teamId }).lean();
      let { loggedIn, loggedOut } = this.getUserIds(users);

      const loggedOutEvent = new Event({
        user_ids: loggedOut,
        notification_id: notification._id,
        status: false,
      });

      loggedOutEvent.save();

      // Trigger the notification
      this.triggerNotification(
        loggedIn,
        teamId,
        playerId,
        title,
        message,
        type,
        res
      );

      //add the event
      const loggedInEvent = new Event({
        user_ids: loggedIn,
        notification_id: notification._id,
        status: true,
      });

      loggedInEvent.save();

      res.status(201).send(notification);
    } catch (err) {
      customError.handleError(err, res);
    }
  }

  getUserIds(users) {
    //filter the is_logged = true and get the user ids
    const loggedIn = users
      .filter((user) => user.is_logged == true)
      .map((user) => user._id);
    console.log(loggedIn);
    const loggedOut = users
      .filter((user) => user.is_logged == false)
      .map((user) => user._id);
    console.log(loggedOut);

    return {
      loggedIn,
      loggedOut,
    };
  }

  //trigger a notification
  triggerNotification(userIds, team_id, player_id, title, message, type, res) {
    try {
      console.log(userIds, team_id, player_id, title, message, type);
      //publish the notification
      publishChange(userIds, team_id, player_id, title, message, type);
      console.log("Notification published successfully");
      logger.info("Notification published successfully");
    } catch (err) {
      throw new CustomError(err.message, 500);
    }
  }
}

module.exports = Notification;
