const express = require("express");
const profileControllers = require("../controllers/profileControllers.js");
const router = express.Router();
const verifyJWT = require("../controllers/verifyJWT").verifyJWT;

//@route GET && POST - /posts/
router
  .route("/")
  .post(verifyJWT, profileControllers.createNewProfile)
  .get(profileControllers.getAllProfile);

router
  .route("/byusername")
  .get(verifyJWT, profileControllers.getProfileByUsername)
  .delete(verifyJWT, profileControllers.deleteProfileByUsername)
  .put(verifyJWT, profileControllers.updateProfileByUsername);

module.exports = router;
