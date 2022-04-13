const express = require("express");
const postControllers = require("../controllers/postControllers.js");
const router = express.Router();
const verifyJWT = require("../controllers/verifyJWT").verifyJWT;

//@route GET && POST - /post/
router
  .route("/")
  .post(verifyJWT, postControllers.createNewPost)
  .get(verifyJWT, postControllers.getAllPostsByUsername);

router
  .route("/community/:community")
  .get(postControllers.getAllPostsByCommunity);

router
  .route("/:id")
  .get(postControllers.getPostById)
  .delete(postControllers.deletePostById)
  .put(postControllers.updatePostById);

router
  .route("/:id/like")
  .get(verifyJWT, postControllers.findPostLikeByIdUsername)
  .post(verifyJWT, postControllers.addNewPostLikeByIdUsername)
  .delete(verifyJWT, postControllers.deletePostLikeByIdUsername);

router
  .route("/:id/dislike")
  .get(verifyJWT, postControllers.findPostDislikeByIdUsername)
  .post(verifyJWT, postControllers.addNewPostDislikeByIdUsername)
  .delete(verifyJWT, postControllers.deletePostDislikeByIdUsername);

module.exports = router;
