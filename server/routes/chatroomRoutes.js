const express = require("express");
const chatroomControllers = require("../controllers/chatroomControllers.js");
const router = express.Router();

//@route GET && POST - /posts/
router
  .route("/")
  .post(chatroomControllers.createNewChatroom)
  .get(chatroomControllers.getAllChatroomsByUsername)
  .delete(chatroomControllers.deleteChatroomByChatId)
  .put(chatroomControllers.updateChatroomTitleByChatId);

module.exports = router;
