const Democracry = require("democracy");
const { connectDB } = require("./connect");

let logicalTime = 0;

function incrementClock() {
  logicalTime++;
  return logicalTime;
}

function updateClock(timestamp) {
  logicalTime = Math.max(logicalTime, timestamp) + 1;
  return logicalTime;
}

const setUpSubscribe = (port) => {
  const dem = new Democracry({
    source: `0.0.0.0:${port}`,
    peers: ["0.0.0.0:5000", "0.0.0.0:5001", "0.0.0.0:5002"],
    id: `${port.slice(-1)}`,
  });

  connectDB(port, `./db/rep${dem._id}.db`);

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

  dem.on("global", (msg) => {
    const { db } = require("./connect");

    const [timestamp, update] = msg.split("|");

    console.log("Sync");
    new Promise((resolve, reject) => {
      db.run(update, (err, result) => {
        if (err) reject(err);
        resolve(result);

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
