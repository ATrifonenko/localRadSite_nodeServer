const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const basename = path.basename(module.filename);
const config = require("../config");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
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

// fs.readdirSync(__dirname + "/models")
//   .filter(file => {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//     );
//   })
//   .forEach(file => {
//     const model = sequelize["import"](path.join(__dirname + "/models", file));
//     db[model.name] = model;
//   });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
