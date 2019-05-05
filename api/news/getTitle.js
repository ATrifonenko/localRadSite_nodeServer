const models = require("../../database");

const getTitle = (req, res) => {
  const userId = req.session.userId;
  models.News.findAndCountAll({
    where: { userId },
    include: [{ model: models.File }],
    order: [["datetime", "DESC"]],
    limit: 15,
    offset: (req.params.page - 1) * 15
  }).then(result => res.json({ news: result.rows, count: result.count }));
};

module.exports = getTitle;
