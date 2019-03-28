const models = require("../../database");

const delNews = (req, res) => {
  const userId = req.session.userId;
  const { newsId } = req.body;

  models.News.destroy({
    where: {
      id: newsId
    }
  }).then(() => {
    models.News.findAll({
      where: { userId },
      include: [{ model: models.File }],
      order: [["datetime", "DESC"]]
    }).then(news => res.json({ news: news }));
  });
};

module.exports = delNews;
