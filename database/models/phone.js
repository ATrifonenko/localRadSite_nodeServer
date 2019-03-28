module.exports = (sequelize, Sequelize) => {
  const Phone = sequelize.define("phone", {
    number: { type: Sequelize.STRING, allowNull: false },
    typePhone: {
      type: Sequelize.ENUM(["IP", "line", "mob"]),
      defaultValue: "line",
      allowNull: false
    },
    note: { type: Sequelize.STRING }
  });

  Phone.associate = function(models) {
    models.Phone.belongsToMany(models.Person, { through: "PhonePerson" });
  };

  return Phone;
};
