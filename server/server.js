const express = require("express");
// take port from cmd line
const port = process.argv[2] || "5000";
const cors = require("cors");
require("dotenv").config();

// use for local test connection with frontend. Default does not let frontend fetch from local ip api
const corsOptions = {
  origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

// set up communication
const { setUpSubscribe } = require("./communicate");
setUpSubscribe(port);

app.get("/health-check", (req, res) => {
  res.status(200).send("OK");
});

app.use("/api/items", require("./routes/itemsRoute"));
app.use("/api/addOrder", require("./routes/ordersRoute"));
app.use("/api/qty", require("./routes/qtyRoute"));

app.listen(port, (err) => {
  err
    ? console.log("Failed to listen on PORT " + port)
    : console.log("Application Server listening on PORT " + port);
});
