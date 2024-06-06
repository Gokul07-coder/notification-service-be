const { Router } = require("express");
const router = Router();
const Health = require("./health.js");
const Authentication = require("./authentication.js");
const Subscription = require("./subscription.js");
const Notification = require("./notification.js");

router.use("/health", Health);
router.use("/", Authentication);
router.use("/", Subscription);
router.use("/", Notification);

module.exports = router;
