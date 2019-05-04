const models = require("../../database");

const getNewsPage = (req, res) => {
  models.News.findAndCountAll({
    attributes: {
      include: [[models.Sequelize.literal("user.name"), "author"]]
    },
    include: [
      { model: models.File },
      { model: models.User, attributes: [], required: true }
    ],
    order: [["datetime", "DESC"]],
    limit: 15,
    offset: (req.params.page - 1) * 15
  }).then(result =>
    res.json({
      count: result.count,
      page: +req.params.page,
      news: result.rows
    })
  );
  //.catch(err => res.json({ errors: err }));
};

module.exports = getNewsPage;
