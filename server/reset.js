// this file is used to initialize or reset main.db inventory
// dazzleDB is the initial database with all item having quantity of 5
const fs = require("fs");
fs.copyFile("./db/dazzleDB.db", "./db/rep0.db", (err) => {
  if (err) throw err;
});
fs.copyFile("./db/dazzleDB.db", "./db/rep1.db", (err) => {
  if (err) throw err;
});
fs.copyFile("./db/dazzleDB.db", "./db/rep2.db", (err) => {
  if (err) throw err;
});
