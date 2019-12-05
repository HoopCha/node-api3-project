const express = require("express");
const helmet = require("helmet");

const userRouter = require("./users/userRouter");
const logger = require("./middleware/logger");

const server = express();

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

server.use(helmet());
server.use(express.json());
server.use(logger);

server.use("/api/users", userRouter);

module.exports = server;