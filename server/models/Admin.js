const db = require("../config/db");

class Admin {
  constructor(username, password, email) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  save() {
    let sql = `INSERT INTO admin(username, password, email)
    VALUES ('${this.username}', '${this.password}', '${this.email}')`;

    const newAdmin = db.execute(sql);

    return newAdmin;
  }

  //no need to create an instance to use static method
  static findAll() {
    let sql = "SELECT * FROM admin;";
    return db.execute(sql);
  }

  static findByUsername(username) {
    let sql = `SELECT * FROM admin WHERE username = ${username};`;
    return db.execute(sql);
  }

  static deleteByUsername(username) {
    let sql = `DELETE FROM admin WHERE username = ${username};`;
    return db.execute(sql);
  }
  static updatePasswordByUsername(username, password) {
    let sql = `UPDATE admin SET password = ${password}, email = ${email} WHERE username = ${username};`;
    return db.execute(sql);
  }
}

module.exports = Admin;
