const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "power",
    {
      id: {
        type: DataTypes.STRING(4),
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
