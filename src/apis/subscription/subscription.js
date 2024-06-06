const CustomError = require("../../utils/error");
const customError = new CustomError();
const { Team, User } = require("../../db/schema");
const {
  idValidationSchema,
} = require("../../validation/subscriptionValidation");

class Subscription {
  //user subscribe to a team
  async subscribeToTeam(req, res) {
    try {
      const user = req.user;
      const team = req.params.teamId;

      const { error } = idValidationSchema.validate({ id: team });
      if (error) {
        throw new CustomError(error.details[0].message, 400);
      }

      //check if the team exists or not
      const teamCheck = await Team.findOne({ _id: team });
      if (!teamCheck) {
        throw new CustomError("Team not found", 404);
      }

      //check if already subscribed to the team
      const isSubscribed = await User.findOne({
        _id: user.id,
        fav_team: team,
      });

      if (isSubscribed) {
        throw new CustomError(
          `Already subscribed to ${teamCheck.name} team`,
          400
        );
      }

      //update the status
      const updateStatus = await User.updateOne(
        {
          _id: user.id,
        },
        {
          $push: {
            fav_team: team,
          },
        }
      );

      if (updateStatus.modifiedCount === 0) {
        throw new CustomError("Subscription failed", 500);
      }

      res.status(200).send({ message: `Subscribed to the ${teamCheck.name}` });
    } catch (err) {
      customError.handleError(err, res);
    }
  }

  //user subscribe to player - field level of a document
  async subscribeToPlayer(req, res) {
    try {
      // let user = req.user;
      let user = {};
      const player = req.params.playerId;
      user.id = "6648ca363f6b2f2603fab23f";

      const { error } = idValidationSchema.validate({ id: player });
      if (error) {
        throw new CustomError(error.details[0].message, 400);
      }

      //check if the player exists or not
      const playerCheck = await Team.findOne({
        players: {
          $elemMatch: { _id: player },
        },
      });

      if (!playerCheck) {
        throw new CustomError("Player not found", 404);
      }

      let playerName = Object.values(playerCheck.players).filter(
        (playerData) => {
          if (playerData._id == player) return playerData.name;
        }
      );

      //check if already subscribed to the player
      const isSubscribed = await User.findOne({
        _id: user.id,
        fav_player: player,
      });

      if (isSubscribed) {
        throw new CustomError(
          `Already subscribed to ${playerName[0].name}`,
          400
        );
      }

      //update the status
      const updateStatus = await User.updateOne(
        {
          _id: user.id,
        },
        {
          $push: {
            fav_player: player,
          },
        }
      );

      if (updateStatus.modifiedCount === 0) {
        throw new CustomError("Subscription failed", 500);
      }

      res
        .status(200)
        .send({ message: `Subscribed to the ${playerName[0].name}` });
    } catch (err) {
      customError.handleError(err, res);
    }
  }

  async getAllteam(req, res) {
    try {
      const teams = await Team.find(
        {},
        {
          name: 1,
          _id: 1,
        }
      );
      res.status(200).send(teams);
    } catch (err) {
      customError.handleError(err, res);
    }
  }

  async getSubscribedTeam(req, res) {
    try {
      const user = req.user;

      const subscribedTeams = await User.findOne(
        { _id: user.id },
        {
          fav_team: 1,
        }
      ).populate("fav_team");

      console.log(subscribedTeams);

      if (!subscribedTeams?.fav_team?._id) {
        throw new CustomError("No subscribed team found", 404);
      }

      let result = {
        user_id: subscribedTeams._id,
        name: subscribedTeams.fav_team.name,
        id: subscribedTeams.fav_team._id,
      };

      res.status(200).send(result);
    } catch (err) {
      customError.handleError(err, res);
    }
  }
}

// [
//   {
//       "_id": "66485f8d8a5a85b6a4d6688c",
//       "name": "Royal Challengers Bangalore"
//   },
//   {
//       "_id": "66485f8d8a5a85b6a4d66890",
//       "name": "Mumbai Indians"
//   },
//   {
//       "_id": "66485f8d8a5a85b6a4d66894",
//       "name": "Chennai Super Kings"
//   }
// ]

module.exports = Subscription;
