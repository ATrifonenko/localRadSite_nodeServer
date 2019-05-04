const models = require("../../database");
const multer = require("multer");

const addNews = (req, res) => {
  const storage = multer.diskStorage({
    destination: `./uploads/${req.session.userId}`,
    filename: function(req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
    }
  });
  const upload = multer({
    storage: storage
  }).array("file[]");

  upload(req, res, err => {
    if (err) {
      res.json({ errors: err });
    } else {
      const { userId } = req.session;
      const { title, text } = req.body;

      models.News.create({
        title,
        text,
        userId
      }).then(async news => {
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
        models.News.findAll({
          where: { userId },
          include: [{ model: models.File }],
          order: [["datetime", "DESC"]]
        }).then(news => res.json({ news: news }));
      });
    }
  });
};

module.exports = addNews;
