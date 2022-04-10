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

module.exports = router;
