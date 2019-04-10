const models = require("../../database");

const addRow = (req, res) => {
  const { firstName, lastName, patronymic, position, unitId } = req.body;

  if (unitId) {
    models.Person.create({
      firstName,
      lastName,
      patronymic,
      position,
      unitId
    })
      .then(person => {
        req.body.numbers.map(number => {
          models.Phone.findOrCreate({
            where: { number: number.number },
            defaults: { typePhone: number.typePhone, note: null }
          }).then(() => {
            models.Phone.findOne({
              where: { number: number.number }
            }).then(phone => {
              person.addPhone(phone);
            });
          });
        });
      })
      .then(() => {
        res.send("ok");
      });
  } else res.send("Этот человек уже есть в справочнике");
};

module.exports = addRow;
