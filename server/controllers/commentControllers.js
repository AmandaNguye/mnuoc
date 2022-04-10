const Comment = require("../models/Comment");

exports.createNewComment = async (req, res, next) => {
  try {
    let { post_id, text, username } = req.body;
    let comment = new Comment(post_id, text, username);

    comment = await comment.save();

    res.status(201).json({ message: "Comment created.", comment });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAllComments = async (req, res, next) => {
  try {
    const [comments, _] = await Comment.findAll();

    res.status(200).json({ count: comments.length, comments });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getCommentByPostId = async (req, res, next) => {
  try {
    let postId = req.params.id;

    let [comment, _] = await Comment.findByPostId(postId);

    res.status(200).json({ comment });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteCommentByCommentId = async (req, res, next) => {
  try {
    let commentId = req.params.cid;

    let [comment, _] = await Comment.deleteByCommentId(commentId);

    res.status(200).json({ comment });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateCommentByCommentId = async (req, res, next) => {
  try {
    let commentId = req.params.cid;
    let { title, text } = req.body;

    let [comment, _] = await Comment.updateByCommentId(commentId, text);

    res.status(200).json({ comment });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//like functionality
exports.findCommentLikesByCommentId = async (req, res, next) => {
  try {
    let commentId = req.params.cid;

    let [likes, _] = await Comment.findLikesByCommentId(commentId);

    res.status(200).json({ count: likes.length, likes });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.addNewCommentLikeByCommentIdUsername = async (req, res, next) => {
  try {
    let { username } = req.body;
    let commentId = req.params.cid;

    let [newCommentLike, _] = await Comment.addLikeByCommentIdUsername(
      commentId,
      username
    );

    res.status(201).json({ message: "comment like added.", newCommentLike });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteCommentLikeByCommentIdUsername = async (req, res, next) => {
  try {
    let { username } = req.body;
    let commentId = req.params.cid;

    let [commentLike, _] = await Comment.deleteLikeByCommentIdUsername(
      commentId,
      username
    );

    res.status(200).json({ commentLike });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.findCommentDislikesByCommentId = async (req, res, next) => {
  try {
    let commentId = req.params.cid;

    let [dislikes, _] = await Comment.findDislikesByCommentId(commentId);

    res.status(200).json({ count: dislikes.length, dislikes });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.addNewCommentDislikeByCommentIdUsername = async (req, res, next) => {
  try {
    let { username } = req.body;
    let commentId = req.params.cid;

    let [newCommentDislike, _] = await Comment.addDislikeByCommentIdUsername(
      commentId,
      username
    );

    res
      .status(201)
      .json({ message: "comment dislike added.", newCommentDislike });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteCommentDislikeByCommentIdUsername = async (req, res, next) => {
  try {
    let { username } = req.body;
    let commentId = req.params.cid;

    let [commentDislike, _] = await Comment.deleteDislikeByCommentIdUsername(
      commentId,
      username
    );

    res.status(200).json({ commentDislike });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
