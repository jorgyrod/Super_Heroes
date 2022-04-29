const { Type, Vehicle } = require("../../../db");

const createVehicle = async (data) => {
  const { modelo, marca, color, motor, idTipo } = data;

  const newVehicle = await Vehicle.create({ modelo, marca, color, motor });

  const type = await Type.findByPk(idTipo);
  type.addVehicle(newVehicle);

  return { ...newVehicle.toJSON() };
};

module.exports = createVehicle;
