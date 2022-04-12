const express = require("express");
const postControllers = require("../controllers/postControllers.js");
const router = express.Router();
const verifyJWT = require("../controllers/verifyJWT").verifyJWT;

//@route GET && POST - /posts/
router
  .route("/")
  .post(verifyJWT, postControllers.createNewPost)
  .get(verifyJWT, postControllers.getAllPostsByUsername);

router
  .route("/:id")
  .get(postControllers.getPostById)
  .delete(postControllers.deletePostById)
  .put(postControllers.updatePostById);

router
  .route("/:id/likes")
  .get(postControllers.findPostLikesById)
  .post(verifyJWT, postControllers.addNewPostLikeByIdUsername)
  .delete(verifyJWT, postControllers.deletePostLikeByIdUsername);

router
  .route("/:id/dislikes")
  .get(postControllers.findPostDislikesById)
  .post(verifyJWT, postControllers.addNewPostDislikeByIdUsername)
  .delete(verifyJWT, postControllers.deletePostDislikeByIdUsername);

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
