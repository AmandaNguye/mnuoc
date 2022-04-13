const express = require("express");
const profileControllers = require("../controllers/profileControllers.js");
const router = express.Router();
const verifyJWT = require("../controllers/verifyJWT").verifyJWT;

//@route GET && POST - /posts/
router
  .route("/")
  .get(verifyJWT, profileControllers.getProfileByUsername)
  .put(verifyJWT, profileControllers.updateProfileByUsername);

module.exports = router;
