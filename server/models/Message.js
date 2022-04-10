const db = require("../config/db");

class Message {
  constructor(chat_id, text, username) {
    this.chat_id = chat_id;
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

    let sql = `INSERT INTO message(chat_id, text, username, time_created) VALUES ('${this.chat_id}', '${this.text}', '${this.username}', '${time_created}');`;

    const newMessage = db.execute(sql);

    return newMessage;
  }
  //no need to create an instance to use static method
  static findAll() {
    let sql = "SELECT * FROM message;";
    return db.execute(sql);
  }

  static findByChatId(id) {
    let sql = `SELECT * FROM message WHERE chat_id = ${id};`;
    return db.execute(sql);
  }

  static deleteByMessageId(id) {
    let sql = `DELETE FROM message WHERE message_id = ${id};`;
    return db.execute(sql);
  }

  static updateByMessageId(id, text) {
    let sql = `UPDATE message SET text = '${text}' WHERE message_id = ${id};`;
    return db.execute(sql);
  }
}

module.exports = Message;
