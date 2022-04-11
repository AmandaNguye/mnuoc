const express = require("express");
const userControllers = require("../controllers/userControllers.js");
const router = express.Router();
const verifyJWT = require("../index.js").verifyJWT;

//@route GET && POST - /posts/
router.route("/").get(userControllers.getAllUser);

router
  .route("/byusername")
  .delete(userControllers.deleteUserByUsername)
  .put(userControllers.updateUserPasswordByUsername);

router
  .route("/usercommunities")
  .get(userControllers.findUserInCommunityByUsername)
  .post(userControllers.addUserInCommunityByUsernameCommunity)
  .delete(userControllers.deleteUserInCommunityByUsername);

router.route("/register").post(userControllers.createNewUser);

router.route("/login").post(userControllers.login);

router.get("/isUserAuth", verifyJWT, (req, res) => {
  res.json({ isLoggedIn: true, username: req.user.username });
});

module.exports = router;
