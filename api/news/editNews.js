const models = require("../../database");
const multer = require("multer");
const fs = require("fs");

const editNews = (req, res) => {
  const storage = multer.diskStorage({
    destination: `./uploads/${req.session.userId}`,
    filename: function(req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
    }
  });
  const upload = multer({
    storage: storage
  }).array("file[]");

  const { userId } = req.session;
  upload(req, res, err => {
    if (err) {
      res.json({ errors: err });
    } else {
      const { title, text, newsId, delFile } = req.body;

      models.News.findByPk(newsId).then(news => {
        news
          .update({
            title,
            text
          })
          .then(async () => {
            if (delFile) {
              await Promise.all(
                delFile.map(fileId => {
                  models.File.findByPk(fileId).then(file => {
                    fs.unlink(file.dataValues.path, err => {
                      if (err) res.json({ errors: err });
                    });
                    file.destroy();
                  });
                })
              );
            }
            if (req.files) {
              await Promise.all(
                req.files.map(file => {
                  news.createFile({
                    name: file.originalname,
                    path: file.path,
                    userId
                  });
                })
              );
            }
            models.News.findAndCountAll({
              where: { userId },
              include: [{ model: models.File }],
              order: [["datetime", "DESC"]],
              limit: 15
            }).then(result =>
              res.json({ news: result.rows, count: result.count })
            );
          });
      });
    }
  });
};

module.exports = editNews;
