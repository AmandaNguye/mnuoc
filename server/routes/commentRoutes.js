const express = require("express");
const commentControllers = require("../controllers/commentControllers.js");
const router = express.Router();

//@route GET && POST - /comments/
router
  .route("/")
  .post(commentControllers.createNewComment)
  .get(commentControllers.getAllCommentsByUsername);

router.route("/:id").get(commentControllers.getCommentByPostId);

router
  .route("/:id/:cid")
  .delete(commentControllers.deleteCommentByCommentId)
  .put(commentControllers.updateCommentByCommentId);

router
  .route("/:id/:cid/likes")
  .get(commentControllers.findCommentLikesByCommentId)
  .post(commentControllers.addNewCommentLikeByCommentIdUsername)
  .delete(commentControllers.deleteCommentLikeByCommentIdUsername);

router
  .route("/:id/:cid/dislikes")
  .get(commentControllers.findCommentDislikesByCommentId)
  .post(commentControllers.addNewCommentDislikeByCommentIdUsername)
  .delete(commentControllers.deleteCommentDislikeByCommentIdUsername);

module.exports = router;
