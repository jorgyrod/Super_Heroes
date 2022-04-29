const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "country",
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
      foto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
