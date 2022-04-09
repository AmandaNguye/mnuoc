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

module.exports = router;
