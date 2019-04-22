const Sequelize = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    dialect: "mysql",
    define: { timestamps: false }
  }
);

const db = {
  News: sequelize.import("./models/news.js"),
  File: sequelize.import("./models/file.js"),
  User: sequelize.import("./models/user.js"),
  Person: sequelize.import("./models/person.js"),
  Rank: sequelize.import("./models/rank.js"),
  Unit: sequelize.import("./models/unit.js"),
  Phone: sequelize.import("./models/phone.js")
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
