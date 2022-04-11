const express = require("express");
const userControllers = require("../controllers/userControllers.js");
const router = express.Router();

//@route GET && POST - /posts/
router
  .route("/")
  .post(userControllers.createNewUser)
  .get(userControllers.getAllUser);

router
  .route("/byusername")
  .get(userControllers.getUserByUsername)
  .delete(userControllers.deleteUserByUsername)
  .put(userControllers.updateUserPasswordByUsername);
router
  .route("/usercommunities")
  .get(userControllers.findUserInCommunityByUsername)
  .post(userControllers.addUserInCommunityByUsernameCommunity)
  .delete(userControllers.deleteUserInCommunityByUsername);

module.exports = router;
