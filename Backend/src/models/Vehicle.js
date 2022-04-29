const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "vehicle",
    {
      modelo: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      marca: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      motor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
