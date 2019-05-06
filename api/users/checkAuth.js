const models = require("../../database");

const checkAuth = (req, res) => {
  const { userId, userName } = req.session;

  if (userId || userName) {
    models.User.findByPk(userId).then(user => {
      res.json({
        user: {
          logged: true,
          name: userName,
          privilege: user.privilege
        }
      });
    });
  } else {
    res.json({
      user: {
        logged: false
      }
    });
  }
};

module.exports = checkAuth;
