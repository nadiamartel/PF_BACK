const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("reservation", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
