const express = require("express");
const bodyParser = require("body-parser");
const api = require("./api");
const models = require("./database");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const path = require("path");

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(
  session({
    secret: "keyboard cat",
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

server.use("/uploads", function(req, res) {
  var file = __dirname + "/uploads/" + req.path;
  res.download(file); // Set disposition and send it.
});

// models.sequelize.sync().then(function() {
server.listen(9090, function() {
  console.log("Example server listening on port 9090!");
});
// });
