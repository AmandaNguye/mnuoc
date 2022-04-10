const db = require("../config/db");

class Profile {
  constructor(username, tag, bio) {
    this.username = username;
    this.tag = tag;
    this.bio = bio;
  }

  save() {
    let sql = `INSERT INTO profile(username, tag, bio)
    VALUES ('${this.username}', '${this.tag}', '${this.bio}')`;

    const newProfile = db.execute(sql);

    return newProfile;
  }

  //no need to create an instance to use static method
  static findAll() {
    let sql = "SELECT * FROM profile;";
    return db.execute(sql);
  }

  static findByUsername(username) {
    let sql = `SELECT * FROM profile WHERE username = ${username};`;
    return db.execute(sql);
  }

  static deleteByUsername(username) {
    let sql = `DELETE FROM profile WHERE username = ${username};`;
    return db.execute(sql);
  }

  static updateByUsername(username, tag, bio) {
    let sql = `UPDATE profile SET tag = ${tag}, bio = ${bio} WHERE username = ${username};`;
    return db.execute(sql);
  }
}

module.exports = Profile;
