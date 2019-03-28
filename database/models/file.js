module.exports = (sequelize, Sequelize) => {
  const File = sequelize.define("file", {
    name: { type: Sequelize.STRING, allowNull: false },
    path: { type: Sequelize.STRING, allowNull: false }
  });

  File.associate = function(models) {
    models.File.belongsTo(models.News);
    models.File.belongsTo(models.User);
  };

  return File;
};
