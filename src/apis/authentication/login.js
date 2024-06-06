const CustomError = require("../../utils/error");
const {
  userLoginSchema,
  adminLoginSchema,
} = require("../../validation/loginValidation");
const { checkPassword } = require("../../helper/hashPassword");
const { User, Admin, Event } = require("../../db/schema");
const { generateAndSignToken } = require("../../helper/token");
const customError = new CustomError();
const Notification = require("../notification/notification");
const notification = new Notification();

class AccountLogin {
  //user login controller
  async loginUser(req, res) {
    try {
      const data = req.body;
      const { error, value } = userLoginSchema.validate(data);

      if (error) {
        throw new CustomError(error.details[0].message, 400);
      }

      const user = await User.findOne({ phone_number: value.phoneNumber });
      if (!user) {
        throw new CustomError("User does not exist", 404);
      }

      const isPasswordValid = await checkPassword(
        value.password,
        user.password
      );
      if (!isPasswordValid) {
        throw new CustomError("Incorrect password", 400);
      }

      const token = generateAndSignToken({ id: user._id });
      if (!token) throw new CustomError("Token generation failed", 500);

      const updateStatus = await User.updateOne(
        {
          _id: user._id,
        },
        {
          $set: {
            updated_at: Date.now(),
            is_logged: true,
          },
        }
      );

      if (updateStatus.modifiedCount === 0)
        throw new CustomError("User login failed", 500);

      //check the event status
      this.getAndSendEventStatus(user._id, res);

      res.header("x-auth-token", token).status(200).send({
        message: "User logged in successfully",
        token: token,
        status: 200,
      });
    } catch (err) {
      customError.handleError(err, res);
    }
  }

  //admin login controller
  async loginAdminUser(req, res) {
    try {
      const data = req.body;
      const { error, value } = adminLoginSchema.validate(data);

      if (error) {
        throw new CustomError(error.details[0].message, 400);
      }

      const admin = await Admin.findOne({ email: value.email });
      if (!admin) {
        throw new CustomError("Admin does not exist", 404);
      }

      const isPasswordValid = await checkPassword(
        value.password,
        admin.password
      );
      if (!isPasswordValid) {
        throw new CustomError("Incorrect password", 400);
      }

      const token = generateAndSignToken({ id: admin._id });
      if (!token) throw new CustomError("Token generation failed", 500);

      const updateStatus = await Admin.updateOne(
        {
          _id: admin._id,
        },
        {
          $set: {
            updated_at: Date.now(),
          },
        }
      );

      if (updateStatus.modifiedCount === 0)
        throw new CustomError("User login failed", 500);

      res
        .header("x-auth-token", token)
        .status(200)
        .send({ message: "Admin logged in successfully", status: 200 });
    } catch (err) {
      customError.handleError(err, res);
    }
  }

  async getAndSendEventStatus(id, res) {
    try {
      //get the event status and publish it
      const event = await Event.find({ status: false, user_ids: id })
        .lean()
        .populate("notification_id")
        .sort({ created_at: -1 }); // Sort by created_at descending

      if (event.length > 0) {
        //data transfrom
        const data = event.map((item) => {
          return {
            _id: [item._id],
            team_id: item.notification_id.team_id,
            player_id: item.notification_id.player_id,
            title: item.notification_id.title,
            message: item.notification_id.message,
            type: item.notification_id.type,
          };
        });

        data.forEach((datas) => {
          //call the notification service
          notification.triggerNotification(
            datas._id,
            datas.team_id,
            datas.player_id,
            datas.title,
            datas.message,
            datas.type,
            res
          );
        });

        //update the event status
        const updateStatus = await Event.updateOne(
          {
            _id: event[0]._id,
          },
          {
            $set: {
              status: true,
            },
          }
        );
      }
    } catch (err) {
      console.log(err);
      throw new CustomError("Error getting event status", 500);
    }
  }
}

module.exports = AccountLogin;
