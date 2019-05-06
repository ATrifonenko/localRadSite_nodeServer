const models = require("../../database");
const bcrypt = require("bcrypt");

const signUp = (req, res) => {
  const login = req.body.login;
  const password = req.body.password;
  const password2 = req.body.password2;
  const name = req.body.name;
  const errors = {};

  if (!login) {
    errors.global = "Не введен логин";
    res.status(400).json({ errors, user: { signup: false } });
  } else if (!password) {
    errors.global = "Не введен пароль";
    res.status(400).json({ errors, user: { signup: false } });
  } else if (password != password2) {
    errors.global = "Пароли не совпадают";
    res.status(400).json({ errors, user: { signup: false } });
  } else {
    models.User.findOne({ where: { login } }).then(user => {
      if (user) {
        errors.global = "Такой пользователь уже существует";
        res.status(400).json({ errors, user: { signup: false } });
      } else {
        bcrypt.hash(password, 10, function(err, hash) {
          if (err) throw err;
          models.User.create({
            login,
            password: hash,
            name
          }).then(user => {
            req.session.userId = user.id;
            req.session.userLogin = user.login;
            res.json({
              user: { logged: true, name: user.name, privilege: user.privilege }
            });
          });
        });
      }
    });
  }
};

module.exports = signUp;
