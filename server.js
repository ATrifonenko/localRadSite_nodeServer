const express = require("express");
const bodyParser = require("body-parser");
const api = require("./api");
const models = require("./database");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const path = require("path");
const config = require("./config");

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(
  session({
    secret: config.SESSION_SECRET,
    store: new SequelizeStore({
      db: models.sequelize,
      expiration: 7 * 24 * 60 * 60 * 1000
    }),
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    saveUninitialized: false
  })
);

server.use(express.static(path.join(__dirname, "build")));
server.use("/api", api);
server.use("/uploads", express.static("uploads"));

server.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// models.sequelize.sync().then(function() {
server.listen(9090, function() {
  console.log("Example server listening on port 9090!");
});
// });
