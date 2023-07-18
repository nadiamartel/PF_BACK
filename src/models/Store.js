const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "store",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      picture: {
        type: DataTypes.ARRAY(DataTypes.STRING(1000)),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      maps: {
        type: DataTypes.STRING(500)
      },
    },
    {
      paranoid: true
    }
  );
};
