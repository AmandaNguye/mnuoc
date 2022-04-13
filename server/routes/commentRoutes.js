const express = require("express");
const commentControllers = require("../controllers/commentControllers.js");
const router = express.Router();
const verifyJWT = require("../controllers/verifyJWT").verifyJWT;

//@route GET && POST - /comments/
router.route("/").post(verifyJWT, commentControllers.createNewComment);

router.route("/:id").get(commentControllers.getCommentByPostId);

router.route("/:id/:cid").delete(commentControllers.deleteCommentByCommentId);

router
  .route("/:id/:cid/like")
  .get(commentControllers.findCommentLikeByUsername)
  .post(verifyJWT, commentControllers.addNewCommentLikeByCommentIdUsername) //add by username
  .delete(verifyJWT, commentControllers.deleteCommentLikeByCommentIdUsername);

router
  .route("/:id/:cid/dislike")
  .get(commentControllers.findCommentDislikeByUsername) //add by username
  .post(verifyJWT, commentControllers.addNewCommentDislikeByCommentIdUsername)
  .delete(
    verifyJWT,
    commentControllers.deleteCommentDislikeByCommentIdUsername
  );

module.exports = router;
