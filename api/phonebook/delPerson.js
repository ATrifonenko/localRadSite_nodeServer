const models = require("../../database");
const getPhoneBook = require("./getPhoneBook");

const delPerson = (req, res) => {
  const { id } = req.body;
  models.Person.destroy({
    where: {
      id: id
    }
  })
    .then(getPhoneBook(req, res))
    .catch(error =>
      res.status(500).json({
        errors: {
          msgHeader: "На сервере что-то пошло не так",
          msg: error.name
        }
      })
    );
};

module.exports = delPerson;
