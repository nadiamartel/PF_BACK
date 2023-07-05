const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("reservation", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hour: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
