module.exports = (sequelize, Sequelize) => {
  const Person = sequelize.define(
    "person",
    {
      firstName: { type: Sequelize.STRING, allowNull: false },
      lastName: { type: Sequelize.STRING, allowNull: false },
      patronymic: { type: Sequelize.STRING, allowNull: false },
      position: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      fullName: {
        type: Sequelize.VIRTUAL(Sequelize.STRING, [
          "lastName",
          "firstName",
          "patronymic"
        ]),
        get() {
          return this.lastName + " " + this.firstName + " " + this.patronymic;
        }
      }
    }
    // {
    //   getterMethods: {
    //     fullName() {
    //       return (
    //         this.getDataValue("lastName") +
    //         " " +
    //         this.getDataValue("firstName") +
    //         " " +
    //         this.getDataValue("patronymic")
    //       );
    //     }
    //   }
    // }
  );

  Person.associate = function(models) {
    models.Person.belongsTo(models.Unit);
    models.Person.belongsTo(models.Rank);
    models.Person.belongsToMany(models.Phone, { through: "PhonePerson" });
  };

  return Person;
};
