const { Router } = require("express");
const RegisterAccount = require("../apis/authentication/register");
const AccountLogin = require("../apis/authentication/login");
const LogOut = require("../apis/authentication/logout");
const { getToken } = require("../helper/token");

const registerAccount = new RegisterAccount();
const accountLogin = new AccountLogin();
const logout = new LogOut();
const router = Router();

//user routes
router.post("/register", (req, res) => registerAccount.registerUser(req, res));
router.post("/login", (req, res) => accountLogin.loginUser(req, res));
router.post("/logout", getToken, (req, res) => logout.logoutUser(req, res));

//admin routes
router.post("/admin/register", (req, res) =>
  registerAccount.registerAdminUser(req, res)
);
router.post("/admin/login", (req, res) =>
  accountLogin.loginAdminUser(req, res)
);
router.post("/admin/logout", getToken, (req, res) =>
  logout.logoutAdmin(req, res)
);

module.exports = router;
