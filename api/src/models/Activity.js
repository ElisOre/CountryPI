const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "activity",
    {
      id: {
        type: DataTypes.UUID,
        allownull: false,
      },
      name: {
        type: DataTypes.STRING,
        allownull: false,
      },
      dificult: {
        type: DataTypes.INTEGER,
        allownull: false,
      },
      time: {
        type: DataTypes.INTEGER,
      },
      temp: {
        type: DataTypes.STRING,
        allownull: false,
      },
    },
    { timestamps: false }
  );
};
