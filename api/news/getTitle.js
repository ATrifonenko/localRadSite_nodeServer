const models = require("../../database");

const getTitle = (req, res) => {
  const userId = req.session.userId;
  models.News.findAll({
    where: { userId },
    include: [{ model: models.File }],
    order: [["datetime", "DESC"]]
  }).then(news => res.json({ news: news }));
};

module.exports = getTitle;
