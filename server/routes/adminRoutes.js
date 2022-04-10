const express = require("express");
const adminControllers = require("../controllers/adminControllers.js");
const router = express.Router();

//@route GET && POST - /posts/
router
  .route("/")
  .post(adminControllers.createNewAdmin)
  .get(adminControllers.getAllAdmin);

router
  .route("/byusername")
  .get(adminControllers.getAdminByUsername)
  .delete(adminControllers.deleteAdminByUsername)
  .put(adminControllers.updateAdminPasswordByUsername);

router
  .route("/management")
  .get(adminControllers.findAdminManagementByAdminUsername)
  .post(adminControllers.addAdminManagementByAdminUsernameCommunity)
  .delete(adminControllers.deleteAdminManagementByUsername);

module.exports = router;
