const CustomError = require("../../utils/error");
const { userSchema, adminSchema } = require("../../validation/registerValidation");
const { hashPassword } = require("../../helper/hashPassword");
const { User, Admin } = require("../../db/schema");
const customError = new CustomError();

//controller for registering an new account
class RegisterAccount {
  //register an normal user
  async registerUser(req, res) {
    try {
      const data = req.body;
      const { error, value } = userSchema.validate(data);

      if (error) {
        throw new CustomError(error.details[0].message, 400);
      }

      //check the existence of the user
      const user = await User.findOne({ phone_number: value.phoneNumber });
      if (user) {
        throw new CustomError("User already exists", 409);
      }

      //hash the password
      value.password = await hashPassword(value.password);

      //create a new user
      const newUser = new User({
        name: value.userName,
        phone_number: value.phoneNumber,
        password: value.password,
        updated_at: Date.now(),
      });

      //save the response
      await newUser.save();

      //send the response
      res
        .status(201)
        .send({ message: "User created successfully", status: 201 });
    } catch (err) {
      customError.handleError(err, res);
    }
  }

  //register an admin user
  async registerAdminUser(req, res) {
    try {
      const data = req.body;
      const { error, value } = adminSchema.validate(data);

      if (error) {
        throw new CustomError(error.details[0].message, 400);
      }

      //check the existence of the user
      const admin = await Admin.findOne({ email: value.email });
      if (admin) {
        throw new CustomError("Admin already exists", 409);
      }

      //hash the password
      value.password = await hashPassword(value.password);

      //create a new admin
      const newAdmin = new Admin({
        name: value.name,
        email: value.email,
        password: value.password,
        updated_at: Date.now(),
      });

      //save the response
      await newAdmin.save();

      //send the response
      res
        .status(201)
        .send({ message: "Admin created successfully", status: 201 });
    } catch (err) {
      customError.handleError(err, res);
    }
  }
}

module.exports = RegisterAccount;
