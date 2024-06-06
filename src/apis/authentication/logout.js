const { User, Admin } = require("../../db/schema");
const CustomError = require("../../utils/error");
const customError = new CustomError();

class LogOut {
  async logoutUser(req, res) {
    try {
      //update status of user to logged out
      const user = req.user;
      const userData = await User.findOne({ _id: user.id });

      if (!userData) {
        return res.status(400).send({ message: "User not found", status: 400 });
      }

      // Check if the user is already logged out
      if (!userData.is_logged) {
        return res
          .status(400)
          .send({ message: "User is already logged out", status: 400 });
      }

      // Update the user's status to logged out
      const updateStatus = await User.updateOne(
        { _id: userData._id },
        { $set: { is_logged: false } }
      );

      if (updateStatus.modifiedCount === 0)
        throw new CustomError("User logout failed", 500);

      // Clear the token from the header
      res
        .header("x-auth-token", "")
        .status(200)
        .send({ message: "User logged out successfully", status: 200 });
    } catch (err) {
      customError.handleError(err, res);
    }
  }

  async logoutAdmin(req, res) {
    try {
      //update status of admin to logged out
      const admin = req.user;
      const adminData = await Admin.findOne({ _id: admin.id });

      if (!adminData) {
        return res
          .status(400)
          .send({ message: "Admin not found", status: 400 });
      }

      // Check if the admin is already logged out
      if (!adminData.is_logged) {
        return res
          .status(400)
          .send({ message: "Admin is already logged out", status: 400 });
      }

      // Update the admin's status to logged out
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
        throw new CustomError("Admin logout failed", 500);

      // Clear the token from the header
      res
        .header("x-auth-token", "")
        .status(200)
        .send({ message: "Admin logged out successfully", status: 200 });
    } catch (err) {
      customError.handleError(err, res);
    }
  }
}

module.exports = LogOut;
