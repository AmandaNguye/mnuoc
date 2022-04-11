const db = require("../config/db");

class Post {
  constructor(title, text, username, community) {
    this.title = title;
    this.text = text;
    this.username = username;
    this.community = community;
  }

  save() {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1; //0 index, add one
    let days = d.getDate();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();

    let time_created = `${year}-${month}-${days} ${hours}:${minutes}:${seconds}`;

    let sql = `INSERT INTO post(title, text, username, community, time_created) VALUES ('${this.title}', '${this.text}', '${this.username}', '${this.community}', '${time_created}')`;

    const newPost = db.execute(sql);

    return newPost;
  }

  //no need to create an instance to use static method
  static findAllByUsername(username) {
    let sql = `SELECT * FROM post WHERE username = ${username};`;
    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM post WHERE post_id = ${id};`;
    return db.execute(sql);
  }

  static deleteById(id) {
    let sql = `DELETE FROM post WHERE post_id = ${id};`;
    return db.execute(sql);
  }

  static updateById(id, title, text) {
    let sql = `UPDATE post SET title = '${title}', text = '${text}' WHERE post_id = ${id};`;
    return db.execute(sql);
  }

  //post_like functionality
  static findLikesById(id) {
    let sql = `SELECT * FROM post_likes WHERE post_id =${id};`;
    return db.execute(sql);
  }

  static addLikeByIdUsername(id, username) {
    let sql = `INSERT INTO post_likes(post_id, username) VALUES ('${id}', '${username}')`;

    const newLike = db.execute(sql);
    return newLike;
  }

  static deleteLikeByIdUsername(id, username) {
    let sql = `DELETE FROM post_likes WHERE post_id = '${id}' AND username = '${username}'`;

    return db.execute(sql);
  }

  //post_dislike functionality
  static findDislikesById(id) {
    let sql = `SELECT * FROM post_dislikes WHERE post_id =${id};`;
    return db.execute(sql);
  }

  static addDisikeByIdUsername(id, username) {
    let sql = `INSERT INTO post_dislikes(post_id, username) VALUES ('${id}', '${username}')`;

    const newLike = db.execute(sql);
    return newLike;
  }

  static deleteDislikeByIdUsername(id, username) {
    let sql = `DELETE FROM post_dislikes WHERE post_id = '${id}' AND username = '${username}'`;

    return db.execute(sql);
  }

  //post_tag functionality
  static findTagsById(id) {
    let sql = `SELECT * FROM post_tags WHERE post_id =${id};`;
    return db.execute(sql);
  }

  static addTagById(id, tag) {
    let sql = `INSERT INTO post_tags(post_id, tag) VALUES ('${id}', '${tag}')`;

    const newLike = db.execute(sql);
    return newLike;
  }

  static deleteTagById(id, tag) {
    let sql = `DELETE FROM post_tags WHERE post_id = '${id}' AND tag = '${tag}'`;

    return db.execute(sql);
  }

  //image_post functionality
  static findImageById(id) {
    let sql = `SELECT * FROM image_post WHERE post_id =${id};`;
    return db.execute(sql);
  }

  static addImageById(id, image) {
    let sql = `INSERT INTO image_post(post_id, image) VALUES ('${id}', '${image}')`;

    const newImage = db.execute(sql);
    return newImage;
  }

  static deleteImageById(id, image) {
    let sql = `DELETE FROM image_post WHERE post_id = '${id}' AND image = '${image}'`;

    return db.execute(sql);
  }
}

module.exports = Post;
