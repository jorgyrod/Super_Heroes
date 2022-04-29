const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "individual",
    {
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};

