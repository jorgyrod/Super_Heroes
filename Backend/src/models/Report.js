const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "report",
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
      descripcion: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
