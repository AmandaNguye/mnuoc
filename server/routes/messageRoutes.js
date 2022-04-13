const express = require("express");
const messageControllers = require("../controllers/messageControllers.js");
const router = express.Router();
const verifyJWT = require("../controllers/verifyJWT").verifyJWT;

//@route GET && POST - /messages/
router.route("/").post(verifyJWT, messageControllers.createNewMessage);

router.route("/:chid").get(messageControllers.getMessageByChatId);

module.exports = router;
