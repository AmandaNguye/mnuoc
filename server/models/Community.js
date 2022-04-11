const db = require("../config/db");

class Community {
  constructor(community_name, description) {
    this.community_name = community_name;
    this.description = description;
  }

  save() {
    let sql = `INSERT INTO community(community_name, description)
    VALUES ('${this.community_name}', '${this.description}')`;

    const newCommunity = db.execute(sql);

    return newCommunity;
  }

  //no need to create an instance to use static method
  static findAll() {
    let sql = "SELECT * FROM community;";
    return db.execute(sql);
  }

  static findByCommunityName(community_name) {
    let sql = `SELECT * FROM community WHERE community_name = ${community_name};`;
    return db.execute(sql);
  }

  static deleteByCommunityName(community_name) {
    let sql = `DELETE FROM community WHERE community_name = ${community_name};`;
    return db.execute(sql);
  }

  static updateDescriptionByCommunityName(community_name, description) {
    let sql = `UPDATE community SET description = ${description} WHERE community_name = ${community_name};`;
    return db.execute(sql);
  }

  static findAdminsByCommunityName(community_name) {
    let sql = `SELECT * FROM management WHERE community_name = ${community_name};`;
    return db.execute(sql);
  }

  static deleteAdminByCommunityNameAdmin(community_name, admin_username) {
    let sql = `DELETE FROM management WHERE community_name = ${community_name} AND admin_username = ${admin_username};`;
    return db.execute(sql);
  }

  static addAdminByCommunityNameAdmin(community_name, admin_username) {
    let sql = `INSERT INTO management(community_name, admin_username) VALUES ('${community_name}', '${admin_username}')`;
    return db.execute(sql);
  }

  static findUsersByCommunityName(community_name) {
    let sql = `SELECT * FROM in_community WHERE community_name = ${community_name};`;
    return db.execute(sql);
  }

  static deleteUserByCommunityNameUser(community_name, username) {
    let sql = `DELETE FROM in_community WHERE community_name = ${community_name} AND username = ${username};`;
    return db.execute(sql);
  }

  static addUserByCommunityNameUser(community_name, username) {
    let sql = `INSERT INTO in_community(community_name, username) VALUES ('${community_name}', '${username}')`;
    return db.execute(sql);
  }
}

module.exports = Community;
