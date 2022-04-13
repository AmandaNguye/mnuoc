const express = require("express");
const communityControllers = require("../controllers/communityControllers.js");
const router = express.Router();

// community/
router
  .route("/")
  .post(communityControllers.createNewCommunity)
  .get(communityControllers.getAllCommunity);

router
  .route("/bycommunityname")
  .get(communityControllers.getCommunityByCommunityName)
  .delete(communityControllers.deleteCommunityByCommunityName)
  .put(communityControllers.updateCommunityByCommunityName);

router
  .route("/management")
  .get(communityControllers.getCommunityAdminsByCommunityName)
  .post(communityControllers.addCommunityAdminByCommunityNameAdmin)
  .delete(communityControllers.deleteCommunityAdminsByCommunityNameAdmin);

router
  .route("/communityusers")
  .get(communityControllers.getCommunityUsersByCommunityName)
  .post(communityControllers.addCommunityUserByCommunityNameUser)
  .delete(communityControllers.deleteCommunityUsersByCommunityNameUser);

module.exports = router;
