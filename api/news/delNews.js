const models = require("../../database");
const fs = require("fs");

const delNews = async (req, res) => {
  const userId = req.session.userId;
  const { newsId } = req.body;

  await models.File.findAll({
    where: {
      newsId
    }
  }).then(async files => {
    if (files.length > 0) {
      await Promise.all(
        files.map(file => {
          fs.unlink(file.dataValues.path, err => {
            if (err) res.json({ errors: err });
          });
          file.destroy();
        })
      );
    }
  });

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
