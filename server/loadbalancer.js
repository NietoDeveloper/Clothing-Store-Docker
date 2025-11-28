const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

/**
 * Server configurations
 * @typedef {Object} Server
 * @property {string} url - The server URL.
 * @property {boolean} isHealthy - The server health status.
 */

/**
 * An array of server configurations.
 * @type {Server[]}
 */
const servers = [
  { url: "http://localhost:5000", isHealthy: true },
  { url: "http://localhost:5001", isHealthy: true },
  { url: "http://localhost:5002", isHealthy: true },
];
// const servers = [
//   { url: "http://backend1:5000", isHealthy: true },
//   { url: "http://backend2:5001", isHealthy: true },
//   { url: "http://backend3:5002", isHealthy: true },
// ];

let current = 0;

const corsOptions = {
  origin: [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://127.0.0.1:5174",
    "http://localhost:5174",
  ],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("etag", false);
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.get("/lb-health-check", (req, res) => {
  res.status(200).send("OK");
});

/**
 * Checks the health of a server and updates its health status.
 * @param {Server} server - The server to check.
 */
const checkHealth = async (server) => {
  try {
    const response = await axios.get(`${server.url}/health-check`);
    if (response.status === 200 && response.data === "OK") {
      server.isHealthy = true;
    } else {
      server.isHealthy = false;
    }
  } catch (err) {
    server.isHealthy = false;
  }
};

/**
 * Starts a periodic health check of all servers.
 * @param {number} interval - The interval between health checks in milliseconds.
 */
const startHealthCheckInterval = (interval) => {
  setInterval(() => {
    servers.forEach((server) => checkHealth(server));
  }, interval);
};

/**
 * Returns the URL of the next healthy server in a round-robin fashion.
 * @returns {string|null} The URL of the next healthy server, or null if no healthy servers are available.
 */
const getNextHealthyServer = () => {
  for (let i = 0; i < servers.length; i++) {
    current = (current + 1) % servers.length;
    if (servers[current].isHealthy) {
      return servers[current].url;
    }
  }
  return null;
};

/**
 * Checks the health of a server and logs if it is down.
 * @param {string} serverUrl - The URL of the server to check.
 */
const checkServerHealth = async (serverUrl) => {
  try {
    await axios.get(`${serverUrl}/health-check`);
  } catch (err) {
    console.log(`Server ${serverUrl} is down`);
  }
};

/**
 * Checks if all servers are down.
 * @returns {boolean} True if all servers are down, false otherwise.
 */
const allServersDown = () => {
  return servers.every((server) => !server.isHealthy);
};

/**
 * Performs health checks on all servers and logs their status.
 */
const performHealthChecks = () => {
  if (servers.every((server) => server.isHealthy)) {
    console.log("All servers are running!");
    return;
  } else if (allServersDown()) {
    console.log("All servers are down");
  } else {
    for (const server of servers) {
      checkServerHealth(server.url);
    }
  }
};

/**
 * Handles incoming requests and forwards them to a healthy server.
 * @async
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const handler = async (req, res) => {
  const { method, url, headers, body } = req;
  const serverUrl = getNextHealthyServer();

  const clientIP =
    req.connection.remoteAddress || req.headers["x-forwarded-for"];
  console.log(`Client ${clientIP} connected to load balancer`);

  if (!serverUrl) {
    res.status(500).send("No healthy servers available");
    return;
  }
  console.log(`Client ${clientIP} requesting: ` + url);

  try {
    const response = await axios({
      url: `${serverUrl}${url}`,
      method: method,
      headers: headers,
      data: body,
    });

    response.data.server = serverUrl;
    res.status(response.status).send(response.data);
  } catch (err) {
    console.log("Error forwarding request to server: " + serverUrl + url);
    res.status(500).send("Server error");
  }
};

app.use((req, res) => {
  handler(req, res);
});

// Start the load balancer server
const port = parseInt(process.argv[2]) || 4000;
app.listen(port, (err) => {
  err
    ? console.log("Failed to listen on PORT " + port)
    : console.log("Load Balancer Server Listening on PORT " + port);
});

// Start the health check interval
startHealthCheckInterval(1000); // Check the health of servers every 5 seconds
