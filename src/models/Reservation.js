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
      
    },
    hour: {

    },
    cost: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
