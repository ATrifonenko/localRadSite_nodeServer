const models = require("../../database");
const getPhoneBook = require("./getPhoneBook");

const editPhoneBook = (req, res) => {
  const {
    firstName,
    lastName,
    patronymic,
    position,
    subdivision,
    id
  } = req.body;

  const errors = error => ({
    msgHeader: "На сервере что-то пошло не так",
    msg: error.name
  });

  if (!id) {
    models.Person.create({
      firstName,
      lastName,
      patronymic,
      position,
      unitId: subdivision
    })
      .then(async person => {
        await Promise.all(
          req.body.phones.map(async number => {
            await models.Phone.findOrCreate({
              where: { number: number.number },
              defaults: { typePhone: number.typePhone, note: number.note }
            })
              .then(async ([phone]) => {
                await person.addPhone(phone);
              })
              .catch(error =>
                res.status(500).json({
                  errors: errors(error)
                })
              );
          })
        );
        getPhoneBook(req, res);
      })
      .catch(error =>
        res.status(500).json({
          errors: errors(error)
        })
      );
  } else {
    models.Person.findByPk(id)
      .then(person => {
        person
          .update({
            firstName,
            lastName,
            patronymic,
            position,
            unitId: subdivision
          })
          .then(person => {
            models.Phone.findAll({
              include: [
                {
                  model: models.Person,
                  where: { id: person.id },
                  throught: { where: "PhonePerson" }
                }
              ]
            })
              .then(q => {
                person
                  .removePhone(q)
                  .then(async () => {
                    await Promise.all(
                      req.body.phones.map(async number => {
                        await models.Phone.findOrCreate({
                          where: { number: number.number },
                          defaults: {
                            typePhone: number.typePhone,
                            note: number.note
                          }
                        })
                          .then(async ([phone, created]) => {
                            if (created) {
                              await person.addPhone(phone);
                            } else {
                              await phone
                                .update({
                                  number: number.number,
                                  typePhone: number.typePhone,
                                  note: number.note
                                })
                                .then(async editedPhone => {
                                  await person.addPhone(editedPhone);
                                })
                                .catch(error =>
                                  res.status(500).json({
                                    errors: errors(error)
                                  })
                                );
                            }
                          })
                          .catch(error =>
                            res.status(500).json({
                              errors: errors(error)
                            })
                          );
                      })
                    );
                    getPhoneBook(req, res);
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
};

module.exports = editPhoneBook;
