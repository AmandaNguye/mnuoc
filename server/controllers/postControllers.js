const Post = require("../models/Post");

exports.createNewPost = async (req, res, next) => {
  try {
    let username = req.user.username;
    let { title, text, community } = req.body;
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
    const [posts, _] = await Post.findAllPosts();
    if (posts?.length > 0)
      for (i = 0; i < posts.length; i++) {
        posts[i].likes =
          (await Post.findLikesById(posts[i].post_id)).length -
          (await Post.findDislikesById(posts[i].post_id)).length;
      }
    res.status(200).json({ count: posts.length, posts });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.getAllPostsByUsername = async (req, res, next) => {
  try {
    let username = req.user.username;
    const [posts, _] = await Post.findAllByUsername(username);
    /**
     if (posts?.length > 0)
     for (i = 0; i < posts.length; i++) {
       posts[i].likes =
       (await Post.findLikesById(posts[i].post_id)).length -
       (await Post.findDislikesById(posts[i].post_id)).length;
      }
      */
    res.status(200).json({ count: posts.length, posts });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.getAllPostsByCommunity = async (req, res, next) => {
  try {
    let community = req.params.community;
    const [posts, _] = await Post.findAllByCommunity(community);
    if (posts?.length > 0)
      for (i = 0; i < posts.length; i++) {
        let [positive, __] = await Post.findLikesById(posts[i].post_id);
        let [negative, ___] = await Post.findDislikesById(posts[i].post_id);
        posts[i].likes = positive.length - negative.length;
      }
    res.status(200).json({ count: posts.length, posts });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    let postId = req.params.id;

    const [post, _] = await Post.findById(postId);
    if (post?.length > 0) {
      let [positive, __] = await Post.findLikesById(post[0].post_id);
      let [negative, ___] = await Post.findDislikesById(post[0].post_id);
      post[0].likes = positive.length - negative.length;
    }

    res.status(200).json({ post });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deletePostById = async (req, res, next) => {
  try {
    let postId = req.params.id;
    let username = req.user.username;

    let [post, _] = await Post.deleteById(postId, username);

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

//like functionality
exports.findPostLikeByIdUsername = async (req, res, next) => {
  try {
    let username = req.user.username;
    let postId = req.params.id;

    let [likes, _] = await Post.findLikeByIdUsername(postId, username);

    res.status(200).json({ likes });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.addNewPostLikeByIdUsername = async (req, res, next) => {
  try {
    let username = req.user.username;
    let postId = req.params.id;

    let [newPostLike, _] = await Post.addLikeByIdUsername(postId, username);

    res.status(201).json({ message: "post like added.", newPostLike });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deletePostLikeByIdUsername = async (req, res, next) => {
  try {
    let username = req.user.username;
    let postId = req.params.id;

    let [postLike, _] = await Post.deleteLikeByIdUsername(postId, username);

    res.status(200).json({ postLike });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.findPostDislikeByIdUsername = async (req, res, next) => {
  try {
    let username = req.user.username;
    let postId = req.params.id;

    let [dislikes, _] = await Post.findDislikeByIdUsername(postId, username);

    res.status(200).json({ dislikes });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.addNewPostDislikeByIdUsername = async (req, res, next) => {
  try {
    let username = req.user.username;
    let postId = req.params.id;

    let [newPostDislike, _] = await Post.addDislikeByIdUsername(
      postId,
      username
    );

    res.status(201).json({ message: "post dislike added.", newPostDislike });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deletePostDislikeByIdUsername = async (req, res, next) => {
  try {
    let username = req.user.username;
    let postId = req.params.id;

    let [postDislike, _] = await Post.deleteDislikeByIdUsername(
      postId,
      username
    );

    res.status(200).json({ postDislike });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.findPostTagsById = async (req, res, next) => {
  try {
    let postId = req.params.id;

    let [postTags, _] = await Post.findTagsById(postId);

    res.status(200).json({ count: tags.length, postTags });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.addNewPostTagById = async (req, res, next) => {
  try {
    let { tag } = req.body;
    let postId = req.params.id;

    let [newPostTag, _] = await Post.addTagById(postId, tag);

    res.status(201).json({ message: "post tag added.", newPostTag });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deletePostTagById = async (req, res, next) => {
  try {
    let { tag } = req.body;
    let postId = req.params.id;

    let [postTag, _] = await Post.deleteTagById(postId, tag);

    res.status(200).json({ postTag });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.findPostImagesById = async (req, res, next) => {
  try {
    let postId = req.params.id;

    let [postImages, _] = await Post.findImageById(postId);

    res.status(200).json({ count: postImages.length, postImage });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.addNewPostImageById = async (req, res, next) => {
  try {
    let { image } = req.body;
    let postId = req.params.id;

    let [newPostImage, _] = await Post.addImageById(postId, image);

    res.status(201).json({ message: "post image added.", newPostImage });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deletePostImageById = async (req, res, next) => {
  try {
    let { image } = req.body;
    let postId = req.params.id;

    let [postImage, _] = await Post.deleteImageById(postId, image);

    res.status(200).json({ postImage });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
