const express = require("express");
const adminControllers = require("../controllers/adminControllers.js");
const router = express.Router();
const verifyJWT = require("../controllers/verifyJWT").verifyJWT;

//@route GET && POST - /posts/

router.route("/").get(verifyJWT, adminControllers.getAdminByUsername);

router
  .route("/management")
  .get(verifyJWT, adminControllers.findAdminManagementByAdminUsername)
  .post(verifyJWT, adminControllers.addAdminManagementByAdminUsernameCommunity)
  .delete(verifyJWT, adminControllers.deleteAdminManagementByUsername);

router.route("/login").post(adminControllers.login);

module.exports = router;
