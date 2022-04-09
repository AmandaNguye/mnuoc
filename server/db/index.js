const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  user: "root",
  password: "root",
  database: "MEANDUOFC",
  host: "localhost",
  port: "3306",
});

let database = {};
database.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM post", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

database.one = (username) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM user WHERE username = ?",
      [username],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

module.exports = database;
