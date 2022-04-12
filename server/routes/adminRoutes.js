const express = require("express");
const adminControllers = require("../controllers/adminControllers.js");
const router = express.Router();
const verifyJWT = require("../controllers/verifyJWT").verifyJWT;

//@route GET && POST - /posts/
router.route("/").get(adminControllers.getAllAdmin);

router
  .route("/byusername")
  .get(verifyJWT, adminControllers.getAdminByUsername)
  .delete(verifyJWT, adminControllers.deleteAdminByUsername)
  .put(verifyJWT, adminControllers.updateAdminPasswordByUsername);

router
  .route("/management")
  .get(verifyJWT, adminControllers.findAdminManagementByAdminUsername)
  .post(verifyJWT, adminControllers.addAdminManagementByAdminUsernameCommunity)
  .delete(verifyJWT, adminControllers.deleteAdminManagementByUsername);

router.route("/register").post(adminControllers.createNewAdmin); //{username, password, email}

router.route("/login").post(adminControllers.login);

module.exports = router;
