const express = require("express");
const commentControllers = require("../controllers/commentControllers.js");
const router = express.Router();

//@route GET && POST - /comments/
router
  .route("/")
  .comment(commentControllers.createNewComment)
  .get(commentControllers.getAllComments);

router.route("/:id").get(commentControllers.getCommentByPostId);

router
  .route("/:id/:cid")
  .delete(commentControllers.deleteCommentByCommentId)
  .put(commentControllers.updateCommentByCommentId);

router
  .route("/:id/:cid/likes")
  .get(commentControllers.findCommentLikesByCommentId);

router
  .route("/:id/:cid/dislikes")
  .get(commentControllers.findCommentDislikesByCommentId);

module.exports = router;
