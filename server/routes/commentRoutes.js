const express = require("express");
const commentControllers = require("../controllers/commentControllers.js");
const router = express.Router();
const verifyJWT = require("../controllers/verifyJWT").verifyJWT;

//@route GET && POST - /comments/
router
  .route("/username")
  .get(verifyJWT, commentControllers.getAllCommentsByUsername);

router
  .route("/:id")
  .post(verifyJWT, commentControllers.createNewComment)
  .get(commentControllers.getCommentByPostId);

router
  .route("/:id/:cid")
  .get(commentControllers.getCommentByCommentId)
  .delete(verifyJWT, commentControllers.deleteCommentByCommentId);

router
  .route("/:id/:cid/like")
  .get(verifyJWT, commentControllers.findCommentLikeByCommentIdUsername)
  .post(verifyJWT, commentControllers.addNewCommentLikeByCommentIdUsername) //add by username
  .delete(verifyJWT, commentControllers.deleteCommentLikeByCommentIdUsername);

router
  .route("/:id/:cid/dislike")
  .get(verifyJWT, commentControllers.findCommentDislikeByCommentIdUsername) //add by username
  .post(verifyJWT, commentControllers.addNewCommentDislikeByCommentIdUsername)
  .delete(
    verifyJWT,
    commentControllers.deleteCommentDislikeByCommentIdUsername
  );

module.exports = router;
