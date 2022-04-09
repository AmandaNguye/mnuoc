const Post = require("../models/Post");

exports.createNewPost = async (req, res, next) => {
  try {
    let { title, text, username, community } = req.body;
    let post = new Post(title, text, username, community);

    post = await post.save();

    res.status(201).json({ message: "Post created.", post });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const [posts, _] = await Post.findAll();

    res.status(200).json({ count: posts.length, posts });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    let postId = req.params.id;

    let [post, _] = await Post.findById(postId);

    res.status(200).json({ post });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deletePostById = async (req, res, next) => {
  try {
    let postId = req.params.id;

    let [post, _] = await Post.deleteById(postId);

    res.status(200).json({ post });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updatePostById = async (req, res, next) => {
  try {
    let postId = req.params.id;
    let { title, text } = req.body;

    let [post, _] = await Post.updateById(postId, title, text);

    res.status(200).json({ post });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.findPostLikesById = async (req, res, next) => {
  try {
    let postId = req.params.id;

    let [likes, _] = await Post.findLikesById(postId);

    res.status(200).json({ count: likes.length, likes });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.findPostDislikesById = async (req, res, next) => {
  try {
    let postId = req.params.id;

    let [dislikes, _] = await Post.findDislikesById(postId);

    res.status(200).json({ count: dislikes.length, dislikes });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
