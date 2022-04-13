const express = require("express");
const chatroomControllers = require("../controllers/chatroomControllers.js");
const router = express.Router();
const verifyJWT = require("../controllers/verifyJWT").verifyJWT;

//@route GET && POST - /posts/
router
  .route("/")
  .post(verifyJWT, chatroomControllers.createNewChatroom)
  .get(verifyJWT, chatroomControllers.getAllChatroomsByUsername)
  .delete(chatroomControllers.deleteChatroomByChatId);

module.exports = router;
