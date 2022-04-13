const express = require("express");
const communityControllers = require("../controllers/communityControllers.js");
const router = express.Router();

// community/
router
  .route("/")
  .post(communityControllers.createNewCommunity)
  .get(communityControllers.getAllCommunity);

router
  .route("/:community")
  .get(communityControllers.getCommunityByCommunityName)
  .delete(communityControllers.deleteCommunityByCommunityName)
  .put(communityControllers.updateCommunityByCommunityName);

router
  .route("/:community/admin")
  .get(communityControllers.getCommunityAdminsByCommunityName)
  .post(communityControllers.addCommunityAdminByCommunityNameAdmin)
  .delete(communityControllers.deleteCommunityAdminsByCommunityNameAdmin);

router
  .route("/:community/users")
  .get(communityControllers.getCommunityUsersByCommunityName)
  .post(communityControllers.addCommunityUserByCommunityNameUser)
  .delete(communityControllers.deleteCommunityUsersByCommunityNameUser);

module.exports = router;
