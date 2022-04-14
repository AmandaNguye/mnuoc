const Comment = require("../models/Comment");

exports.createNewComment = async (req, res, next) => {
  try {
    let username = req.user.username;
    let post_id = req.params.id;
    let { text } = req.body;
    let comment = new Comment(post_id, text, username);

    comment = await comment.save();

    res.status(201).json({ message: "Comment created.", comment });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAllCommentsByUsername = async (req, res, next) => {
  try {
    let username = req.user.username;
    const [comments, _] = await Comment.findAllByUsername(username);
    for (i = 0; i < comments.length; i++) {
      let [positive, __] = await Comment.findLikesByCommentId(
        comments[i].comment_id
      );
      let [negative, ___] = await Comment.findDislikesByCommentId(
        comments[i].comment_id
      );
      comments[i].likes = positive.length - negative.length;
    }
    res.status(200).json({ comments });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getCommentByPostId = async (req, res, next) => {
  try {
    let postId = req.params.id;

    let [comments, _] = await Comment.findByPostId(postId);
    for (i = 0; i < comments.length; i++) {
      let [positive, __] = await Comment.findLikesByCommentId(
        comments[i].comment_id
      );
      let [negative, ___] = await Comment.findDislikesByCommentId(
        comments[i].comment_id
      );
      comments[i].likes = positive.length - negative.length;
    }
    res.status(200).json({ comments });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getCommentByCommentId = async (req, res, next) => {
  try {
    let commentId = req.params.cid;

    let [comment, _] = await Comment.findByCommentId(commentId);
    let [positive, __] = await Comment.findLikesByCommentId(
      comment[0].comment_id
    );
    let [negative, ___] = await Comment.findDislikesByCommentId(
      comment[0].comment_id
    );
    comment[0].likes = positive.length - negative.length;
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
    let { text } = req.body;

    let [comment, _] = await Comment.updateByCommentId(commentId, text);

    res.status(200).json({ comment });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//like functionality
exports.findCommentLikeByCommentIdUsername = async (req, res, next) => {
  try {
    let username = req.user.username;
    let commentId = req.params.cid;

    let [likes, _] = await Comment.findLikeByCommentIdUsername(
      commentId,
      username
    );

    res.status(200).json({ likes });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.addNewCommentLikeByCommentIdUsername = async (req, res, next) => {
  try {
    let username = req.user.username;
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
    let username = req.user.username;
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

exports.findCommentDislikeByCommentIdUsername = async (req, res, next) => {
  try {
    let username = req.user.username;
    let commentId = req.params.cid;

    let [dislikes, _] = await Comment.findDislikeByCommentIdUsername(
      commentId,
      username
    );

    res.status(200).json({ count: dislikes.length, dislikes });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.addNewCommentDislikeByCommentIdUsername = async (req, res, next) => {
  try {
    let username = req.user.username;
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
    let username = req.user.username;
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
