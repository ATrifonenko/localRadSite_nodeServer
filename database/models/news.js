module.exports = (sequelize, Sequelize) => {
  const News = sequelize.define("news", {
    title: { type: Sequelize.STRING, allowNull: false },
    text: { type: Sequelize.TEXT },
    datetime: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
  });

  News.associate = function(models) {
    models.News.hasMany(models.File);
    models.News.belongsTo(models.User);
  };

  return News;
};
