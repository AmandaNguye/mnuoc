const express = require("express");
const commentControllers = require("../controllers/commentControllers.js");
const router = express.Router();
const verifyJWT = require("../controllers/verifyJWT").verifyJWT;

//@route GET && POST - /comments/
router
  .route("/")
  .post(verifyJWT, commentControllers.createNewComment)
  .get(verifyJWT, commentControllers.getAllCommentsByUsername);

router.route("/:id").get(commentControllers.getCommentByPostId);

router
  .route("/:id/:cid")
  .delete(commentControllers.deleteCommentByCommentId)
  .put(commentControllers.updateCommentByCommentId);

router
  .route("/:id/:cid/likes")
  .get(commentControllers.findCommentLikesByCommentId)
  .post(verifyJWT, commentControllers.addNewCommentLikeByCommentIdUsername)
  .delete(verifyJWT, commentControllers.deleteCommentLikeByCommentIdUsername);

router
  .route("/:id/:cid/dislikes")
  .get(commentControllers.findCommentDislikesByCommentId)
  .post(verifyJWT, commentControllers.addNewCommentDislikeByCommentIdUsername)
  .delete(
    verifyJWT,
    commentControllers.deleteCommentDislikeByCommentIdUsername
  );

module.exports = router;
