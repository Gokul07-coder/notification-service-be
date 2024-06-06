const Notification = require("../apis/notification/notification");
const notification = new Notification();
const express = require("express");
const { getToken } = require("../helper/token");
const router = express.Router();

router.post("/notification", 
//getToken, 
(req, res) =>
  notification.createNotification(req, res)
);

module.exports = router;
