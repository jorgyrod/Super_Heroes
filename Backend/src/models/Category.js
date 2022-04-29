const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "category",
    {
      id: {
        type: DataTypes.STRING(3),
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
