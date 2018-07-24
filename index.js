const bodyParser = require("body-parser");
const express = require("express");
const config = require("./config");
const debug = require("debug")("people-api:server");
const _ = require("lodash");
const expressValidator = require("express-validator");

const peopleRoutes = require("./api/routes/people");

const mongoose = require("mongoose");
const mongoConnectionUrl = `mongodb://${config.database.user}:${
  config.database.password
}@${config.database.url}/${
  config.database.db
}?ssl=true&replicaSet=nodejs-people-crud-shard-0&authSource=admin`;
mongoose.connect(
  mongoConnectionUrl,
  { mongoClient: true, useNewUrlParser: true }
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
