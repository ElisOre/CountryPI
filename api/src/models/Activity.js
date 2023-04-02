const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "activity",
    {
      id: {
        type: DataTypes.INTEGER,
        primariKey: true,
        allownull: false,
        autoincrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allownull: false,
      },
      dificulty: {
        type: DataTypes.ENUM('1','2','3','4','5'),
        allownull: false,
      },
      time: {
        type: DataTypes.FLOAT,
      },
      season: {
        type: DataTypes.ENUM('Verano','Otoño','Invierno','Primavera'),
        allownull: false,
      },
    },
    { timestamps: false }
  );
};
