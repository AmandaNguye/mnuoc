const db = require("../config/db");

class Comment {
  constructor(post_id, text, username) {
    this.post_id = post_id;
    this.text = text;
    this.username = username;
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

    let sql = `INSERT INTO comment(post_id, text, username, time_created) VALUES ('${this.post_id}', '${this.text}', '${this.username}', '${time_created}');`;

    const newComment = db.execute(sql);

    return newComment;
  }
  //no need to create an instance to use static method
  static findAllByUsername(username) {
    let sql = `SELECT * FROM comment WHERE username = ${username};`;
    return db.execute(sql);
  }

  static findByPostId(id) {
    let sql = `SELECT * FROM comment WHERE post_id = ${id};`;
    return db.execute(sql);
  }

  static deleteByCommentId(id) {
    let sql = `DELETE FROM comment WHERE comment_id = ${id};`;
    return db.execute(sql);
  }

  static updateByCommentId(id, text) {
    let sql = `UPDATE comment SET text = '${text}' WHERE comment_id = ${id};`;
    return db.execute(sql);
  }

  //comment_like functionality
  static findLikesByCommentId(id) {
    let sql = `SELECT * FROM comment_likes WHERE comment_id =${id};`;
    return db.execute(sql);
  }

  static addLikeByCommentIdUsername(id, username) {
    let sql = `INSERT INTO comment_likes(comment_id, username) VALUES ('${id}', '${username}')`;

    const newLike = db.execute(sql);
    return newLike;
  }

  static deleteLikeByCommentIdUsername(id, username) {
    let sql = `DELETE FROM comment_likes WHERE comment_id = '${id}' AND username = '${username}'`;

    return db.execute(sql);
  }

  //comment_dislike functionality
  static findDislikesByCommentId(id) {
    let sql = `SELECT * FROM comment_dislikes WHERE comment_id =${id};`;
    return db.execute(sql);
  }

  static addDisikeByCommentIdUsername(id, username) {
    let sql = `INSERT INTO comment_dislikes(comment_id, username) VALUES ('${id}', '${username}')`;

    const newLike = db.execute(sql);
    return newLike;
  }

  static deleteDislikeByCommentIdUsername(id, username) {
    let sql = `DELETE FROM comment_dislikes WHERE comment_id = '${id}' AND username = '${username}'`;

    return db.execute(sql);
  }
}

module.exports = Comment;
