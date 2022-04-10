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
  static findAll() {
    let sql = "SELECT * FROM post;";
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

  static findLikesById(id) {
    let sql = `SELECT * FROM post_likes WHERE post_id =${id};`;
    return db.execute(sql);
  }

  static findDislikesById(id) {
    let sql = `SELECT * FROM post_dislikes WHERE post_id =${id};`;
    return db.execute(sql);
  }
}

module.exports = Post;
