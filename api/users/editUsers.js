const models = require("../../database");

const editUsers = async (req, res) => {
  const { id, value } = req.body;

  const errors = error => ({
    msgHeader: "На сервере что-то пошло не так",
    msg: error.name
  });

  if (id) {
    await models.User.findByPk(id)
      .then(async user => {
        await user
          .update({
            privilege: value
          })
          .catch(error =>
            res.status(500).json({
              errors: errors(error)
            })
          );
      })
      .catch(error =>
        res.status(500).json({
          errors: errors(error)
        })
      );
  }
  models.User.findAll({
    order: [["login"]],
    attributes: ["id", "name", "privilege", "login"]
  }).then(users => res.json({ users }));
};

module.exports = editUsers;
