const Democracry = require("democracy");
const { connectDB } = require("./connect");

let logicalTime = 0;

function incrementClock() {
  logicalTime++;
  return logicalTime;
}

// When new update arrives, update the clock based on the logical time from message and current
function updateClock(timestamp) {
  logicalTime = Math.max(logicalTime, timestamp) + 1;
  return logicalTime;
}

// A function used to set up a subscription to the global channel using the Democracy module
const setUpSubscribe = (port) => {
  const dem = new Democracry({
    source: `0.0.0.0:${port}`,
    peers: ["0.0.0.0:5000", "0.0.0.0:5001", "0.0.0.0:5002"],
    id: `${port.slice(-1)}`,
  });

  // init connect
  connectDB(port, `./db/rep${dem._id}.db`);

  // on server start, it will send message to any of the alive servers.
  // if any alive server response, it will replicate the response server
  // firstConnection boolean is used to make sure it only replicate once
  let firstConnection = true;
  dem.on("replicate", ({ connect, origin }) => {
    if (dem._id == origin) {
      if (firstConnection) {
        connectDB(port, `./db/rep${connect}.db`);
        firstConnection = false;
      }
    }
  });
  dem.on("new", (data) =>
    dem.send("replicate", { connect: dem._id, origin: data })
  );
  dem.send("new", dem._id);

  dem.subscribe("global");
  // Adding a listener for the 'global' event, which is emitted when a message is received on the global channel
  // The message contains a SQL query to be executed on the database

  dem.on("global", (msg) => {
    const { db } = require("./connect");

    // split timestamp and query m
    const [timestamp, update] = msg.split("|");
    // console.log(timestamp.toString());

    console.log("Sync");
    new Promise((resolve, reject) => {
      db.run(update, (err, result) => {
        if (err) reject(err);
        resolve(result);

        // Increment logical clock on successful query
        updateClock(timestamp);
        console.log("Logical Time is: " + logicalTime);
      });
    }).catch((err) => console.log(err));
  });
  exports.dem = dem;
};
exports.setUpSubscribe = setUpSubscribe;
exports.logicalTime = logicalTime;
exports.incrementClock = incrementClock;
exports.updateClock = updateClock;
