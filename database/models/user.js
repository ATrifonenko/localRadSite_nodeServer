module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    login: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    name: { type: Sequelize.STRING, defaultValue: "%no-name%" },
    privilege: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "user"
    }
  });

  User.associate = function(models) {
    models.User.hasMany(models.News);
    models.User.hasMany(models.File);
  };

  return User;
};
