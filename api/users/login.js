const models = require("../../database");
const bcrypt = require("bcrypt");

const logIn = (req, res) => {
  const login = req.body.login;
  const password = req.body.password;
  const errors = {};

  if (!login) {
    errors.global = "Не введен логин";
    res.status(400).json({ errors, user: { logged: false } });
  } else if (!password) {
    errors.global = "Не введен пароль";
    res.status(400).json({ errors, user: { logged: false } });
  } else {
    models.User.findOne({ where: { login } }).then(user => {
      if (!user) {
        errors.global = "Логин или пароль введен не верно";
        res.status(400).json({ errors, user: { logged: false } });
      } else {
        bcrypt.compare(password, user.password, function(err, result) {
          if (!result) {
            errors.global = "Логин или пароль введен не верно";
            res.status(400).json({ errors, user: { logged: false } });
          } else {
            req.session.userId = user.id;
            req.session.userName = user.name;
            req.session.userPrivilege = user.privilege;
            res.json({
              user: { logged: true, name: user.name, privilege: user.privilege }
            });
          }
        });
      }
    });
  }
};

module.exports = logIn;
