const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

const connectDB = (port, leaderDB) => {
  
  const dbFile = `./db/rep${port.slice(-1)}.db`;

  const db = new sqlite3.Database(
    dbFile,
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.error(err.message);
        throw err;
      }
      console.log(`Connected to the ${dbFile}`);
    }
  );

  if (dbFile !== leaderDB) {
    fs.copyFile(`${leaderDB}`, `${dbFile}`, (err) => {
      if (err) throw err;
      console.log(`Database replicated from ${leaderDB}`);
    });
  }

  exports.db = db;
};

exports.connectDB = connectDB;
