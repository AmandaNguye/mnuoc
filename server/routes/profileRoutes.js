const express = require("express");
const profileControllers = require("../controllers/profileControllers.js");
const router = express.Router();

//@route GET && POST - /posts/
router
  .route("/")
  .post(profileControllers.createNewProfile)
  .get(profileControllers.getAllProfile);

router
  .route("/byusername")
  .get(profileControllers.getProfileByUsername)
  .delete(profileControllers.deleteProfileByUsername)
  .put(profileControllers.updateProfileByUsername);

module.exports = router;
