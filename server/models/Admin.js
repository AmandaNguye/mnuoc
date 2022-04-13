const db = require("../config/db");

class Admin {
  constructor(username, password, email) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  save() {
    let sql = `INSERT INTO admin(username, password, email) VALUES ('${this.username}', '${this.password}', '${this.email}');`;

    const newAdmin = db.execute(sql);

    return newAdmin;
  }

  //no need to create an instance to use static method
  static findAll() {
    let sql = "SELECT * FROM admin;";
    return db.execute(sql);
  }

  static findByUsername(username) {
    let sql = `SELECT * FROM admin WHERE username = '${username}';`;
    return db.execute(sql);
  }

  static findByEmail(email) {
    let sql = `SELECT * FROM admin WHERE email = '${email}';`;
    return db.execute(sql);
  }

  static deleteByUsername(username) {
    let sql = `DELETE FROM admin WHERE username = '${username}';`;
    return db.execute(sql);
  }
  static updatePasswordByUsername(username, password) {
    let sql = `UPDATE admin SET password = '${password}' WHERE username = '${username}';`;
    return db.execute(sql);
  }

  static findManagementByAdminUsername(admin_username) {
    let sql = `SELECT * FROM management WHERE admin_username = '${admin_username}';`;
    return db.execute(sql);
  }

  static addManagementByAdminUsernameCommunity(admin_username, community_name) {
    let sql = `INSERT INTO management(community_name, admin_username) VALUES ('${community_name}', '${admin_username}');`;
    return db.execute(sql);
  }

  static deleteManagementByAdminUsernameCommunity(
    admin_username,
    community_name
  ) {
    let sql = `DELETE FROM management WHERE admin_username = '${admin_username}' AND community_name = '${community_name}';`;
    return db.execute(sql);
  }
}

module.exports = Admin;
