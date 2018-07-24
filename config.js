require("dotenv").config();
var config = {
  database: {
    url: process.env.MONGO_URL,
    user: process.env.MONGO_USERNAME,
    password: process.env.MONGO_USERPASS,
    db: process.env.MONGO_DBNAME
  },
  server: {
    host: "127.0.0.1",
    port: 4000
  }
};

module.exports = config;
