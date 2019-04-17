const models = require("../../database");

const getPhoneBook = (req, res) => {
  models.Person.findAll({
    attributes: ["id", "fullName", "position"],
    include: [
      {
        model: models.Unit,
        attributes: [
          "id",
          "subdivision",
          [
            models.sequelize.fn("COUNT", models.sequelize.col("sortId")),
            "count_sub"
          ]
        ],
        include: [
          {
            model: models.Person,
            attributes: []
          }
        ]
      },
      {
        model: models.Phone,
        attributes: ["number", "typePhone", "note"],
        through: {
          attributes: []
        },
        order: ["number"]
      }
    ],
    order: [[models.Unit, "sortId"], "lastName", [models.Phone, "number"]],
    group: ["id", "phones.id"]
  }).then(phonebook => {
    models.Unit.findAll({ attributes: ["id", "subdivision"] }).then(units =>
      res.json({ subdivision: units, phonebook: phonebook })
    );
  });
};
module.exports = getPhoneBook;
