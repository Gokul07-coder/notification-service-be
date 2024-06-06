const Subscription = require("../apis/subscription/subscription");
const subscription = new Subscription();
const { Router } = require("express");
const { getToken } = require("../helper/token");
const router = Router();

router.post("/team/:teamId/subscribe", getToken, (req, res) =>
  subscription.subscribeToTeam(req, res)
);

router.post("/player/:playerId/subscribe", getToken, (req, res) =>
  subscription.subscribeToPlayer(req, res)
);

router.get("/teams", getToken, (req, res) => subscription.getAllteam(req, res));

router.get("/getSubscribedTeam", getToken, (req, res) =>
  subscription.getSubscribedTeam(req, res)
);

module.exports = router;
