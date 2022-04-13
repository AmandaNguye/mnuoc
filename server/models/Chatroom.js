const db = require("../config/db");

class Chatroom {
  constructor(title, user1, user2) {
    this.title = title;
    this.user1 = user1;
    this.user2 = user2;
  }

  save() {
    let sql = `INSERT INTO chatroom(title, user1, user2) VALUES ('${this.title}', '${this.user1}', '${this.user2}');`;

    const newChatroom = db.execute(sql);

    return newChatroom;
  }

  //no need to create an instance to use static method
  static findAllByUsername(username) {
    let sql = `SELECT * FROM chatroom WHERE user1 = '${username}' OR user2 = '${username}';`;
    return db.execute(sql);
  }

  static findByChatId(chat_id) {
    let sql = `SELECT * FROM chatroom WHERE chat_id = '${chat_id}';`;
    return db.execute(sql);
  }

  static deleteByChatId(chat_id) {
    let sql = `DELETE FROM chatroom WHERE chat_id = '${chat_id}';`;
    return db.execute(sql);
  }

  static updateChatTitleByChatId(chat_id, title) {
    let sql = `UPDATE chatroom SET title = '${title}' WHERE chat_id = '${chat_id}';`;
    return db.execute(sql);
  }
}

module.exports = Chatroom;
