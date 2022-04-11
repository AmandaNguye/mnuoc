const express = require("express");
const postControllers = require("../controllers/postControllers.js");
const router = express.Router();

//@route GET && POST - /posts/
router
  .route("/")
  .post(postControllers.createNewPost)
  .get(postControllers.getAllPostsByUsername);

router
  .route("/:id")
  .get(postControllers.getPostById)
  .delete(postControllers.deletePostById)
  .put(postControllers.updatePostById);

router
  .route("/:id/likes")
  .get(postControllers.findPostLikesById)
  .post(postControllers.addNewPostLikeByIdUsername)
  .delete(postControllers.deletePostDislikeByIdUsername);

router
  .route("/:id/dislikes")
  .get(postControllers.findPostDislikesById)
  .post(postControllers.addNewPostDislikeByIdUsername)
  .delete(postControllers.deletePostDislikeByIdUsername);

router
  .route("/:id/tags")
  .get(postControllers.findPostTagsById)
  .post(postControllers.addNewPostTagById)
  .delete(postControllers.deletePostTagById);

router
  .route("/:id/images")
  .get(postControllers.findPostImagesById)
  .post(postControllers.addNewPostImageById)
  .delete(postControllers.deletePostImageById);

module.exports = router;
