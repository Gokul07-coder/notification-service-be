const jwt = require("jsonwebtoken");
const { config } = require("../configs");
const CustomError = require("../utils/error");
const customError = new CustomError();

const generateAndSignToken = (payload) => {
  try {
    return jwt.sign(payload, config.SECRET, { expiresIn: "1d" });
  } catch (error) {
    console.error("Token generation failed:", error.message);
    return null;
  }
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.SECRET);
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return null;
  }
};

//get the token from the header
const getToken = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      throw new CustomError("Access denied. No token provided", 401);
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      throw new CustomError("Invalid token", 400);
    }
    req.user = decoded;
    next();
  } catch (err) {
    customError.handleError(err, res);
  }
};

module.exports = {
  generateAndSignToken,
  verifyToken,
  getToken,
};
