const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "activity",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      picture: {
        type: DataTypes.ARRAY(DataTypes.STRING(1000)),
        allowNull: false,
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hours: {
        type: DataTypes.ARRAY(
          DataTypes.ENUM(
            "10-11",
            "11-12",
            "12-13",
            "13-14",
            "14-15",
            "15-16",
            "16-17",
            "17-18",
            "18-19",
            "19-20"
          )
        ),
        allowNull: false,
      },
      days: {
        type: DataTypes.ARRAY(
          DataTypes.ENUM(
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Sábado"
          )
        ),
        allowNull: false,
      },
      players: {
        type: DataTypes.ARRAY(DataTypes.ENUM("2-4", "4-8", "+8")),
        allowNull: false,
      },
      age: {
        type: DataTypes.ARRAY(DataTypes.ENUM("Niños", "Adultos")),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
