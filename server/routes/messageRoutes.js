const express = require("express");
const messageControllers = require("../controllers/messageControllers.js");
const router = express.Router();

//@route GET && POST - /messages/
router
  .route("/")
  .post(messageControllers.createNewMessage)
  .get(messageControllers.getAllMessages);

router.route("/:chid").get(messageControllers.getMessageByPostId);

router
  .route("/:chid/:mid")
  .delete(messageControllers.deleteMessageByMessageId)
  .put(messageControllers.updateMessageByMessageId);

module.exports = router;
