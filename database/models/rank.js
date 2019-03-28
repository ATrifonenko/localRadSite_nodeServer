module.exports = (sequelize, Sequelize) => {
  const Rank = sequelize.define("rank", {
    rank: { type: Sequelize.STRING, allowNull: false }
  });

  Rank.associate = function(models) {
    models.Rank.hasMany(models.Person);
  };

  return Rank;
};
