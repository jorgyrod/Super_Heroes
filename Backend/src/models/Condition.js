const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "condition",
    {
      id: {
        type: DataTypes.STRING(4),
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      estado: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
