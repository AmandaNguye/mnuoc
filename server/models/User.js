const db = require("../config/db");

class User {
  constructor(username, password, email, major) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.major = major;
  }

  save() {
    let sql = `INSERT INTO user(username, password, email, major)
    VALUES ('${this.username}', '${this.password}', '${this.email}', '${this.major}')`;

    const newUser = db.execute(sql);

    return newUser;
  }

  //no need to create an instance to use static method
  static findAll() {
    let sql = "SELECT * FROM user;";
    return db.execute(sql);
  }

  static findByUsername(username) {
    let sql = `SELECT * FROM user WHERE username = ${username};`;
    return db.execute(sql);
  }

  static deleteByUsername(username) {
    let sql = `DELETE FROM user WHERE username = ${username};`;
    return db.execute(sql);
  }

  static updatePasswordByUsername(username, password) {
    let sql = `UPDATE user SET password = ${password} WHERE username = ${username};`;
    return db.execute(sql);
  }
}

module.exports = User;
