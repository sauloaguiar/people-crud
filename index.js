const bodyParser = require("body-parser");
const express = require("express");
const config = require("./config");
const debug = require("debug")("people-api:server");
const _ = require("lodash");
const expressValidator = require("express-validator");

const peopleRoutes = require("./api/routes/people");

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://people-admin:people-admin@nodejs-people-crud-shard-00-00-s4dvp.mongodb.net:27017,nodejs-people-crud-shard-00-01-s4dvp.mongodb.net:27017,nodejs-people-crud-shard-00-02-s4dvp.mongodb.net:27017/test?ssl=true&replicaSet=nodejs-people-crud-shard-0&authSource=admin&retryWrites=true",
  { mongoClient: true }
);

const app = express();
app.use(expressValidator());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    [
      "Accept",
      "Authorization",
      "Content-Type",
      "Origin",
      "X-Requested-With"
    ].join(", ")
  );
  res.header(
    "Access-Control-Allow-Methods",
    ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"].join(", ")
  );
  next();
});

app.use("/api/people", peopleRoutes);

app.listen(config.server.port, () => {
  debug(`API listening on port ${config.server.port}!`);
});
