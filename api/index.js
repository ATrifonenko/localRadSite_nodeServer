const express = require("express");
const models = require("../database");
const news = require("./news");
const users = require("./users");
const phonebook = require("./phonebook");

const router = express.Router();

router.use("/news", news);
router.use("/users", users);
router.use("/phonebook", phonebook);

router.get("/getMain", function(req, res) {
  models.News.findAll({
    attributes: {
      include: [[models.Sequelize.literal("user.name"), "author"]]
    },
    include: [{ model: models.File }, { model: models.User, attributes: [] }],
    order: [["datetime", "DESC"]]
  }).then(news => res.json({ news: news }));
});

module.exports = router;
