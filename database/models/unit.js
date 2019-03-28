module.exports = (sequelize, Sequelize) => {
  const Unit = sequelize.define("unit", {
    subdivision: { type: Sequelize.STRING },
    sortId: { type: Sequelize.INTEGER, unique: true }
  });

  Unit.associate = function(models) {
    models.Unit.hasMany(models.Person);
  };

  return Unit;
};
