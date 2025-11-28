const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

// Define a function called "connectDB" that takes two parameters: port and leaderDB

// Port is used to determine the database file to connect to, while leaderDB specifies the
const connectDB = (port, leaderDB) => {
  // The database file name is generated based on the port number provided to the function.
  
  // The last digit of the port number is used to generate the database file name.
  const dbFile = `./db/rep${port.slice(-1)}.db`;

  // Connect to the database file using the sqlite3 module's Database() method.
  // The method takes in the database file path, and the read and write flags for opening the
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

  // If the database file generated from the port number is not the same as the leaderDB,
  // then the database is cloned from the leaderDB using the copyFile() method from the fs
  if (dbFile !== leaderDB) {
    fs.copyFile(`${leaderDB}`, `${dbFile}`, (err) => {
      if (err) throw err;
      console.log(`Database replicated from ${leaderDB}`);
    });
  }

  exports.db = db;
};

exports.connectDB = connectDB;
