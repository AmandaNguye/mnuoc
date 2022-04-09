const express = require("express");
const postControllers = require("../controllers/postControllers.js");
const router = express.Router();

//@route GET && POST - /posts/
router
  .route("/")
  .post(postControllers.createNewPost)
  .get(postControllers.getAllPosts);

router
  .route("/:id")
  .get(postControllers.getPostById)
  .delete(postControllers.deletePostById)
  .put(postControllers.updatePostById);

router.route("/:id/likes").get(postControllers.findPostLikesById);
router.route("/:id/dislikes").get(postControllers.findPostDislikesById);

module.exports = router;
