const {
  Category,
  City,
  Condition,
  Country,
  Individual,
  Power,
  Report,
  Type,
  Vehicle,
} = require("../../db");

const createIndividual = async (data) => {
  const {
    nombre,
    apellido,
    idCategoria,
    idCiudad,
    idCondicion,
    idActa,
    idVehiculo,
    powers,
  } = data;

  const newIndividual = await Individual.create({
    nombre,
    apellido,
  });

  //Categoria
  const category = await Category.findByPk(idCategoria);
  await category.addIndividual(newIndividual);
  //Ciudad
  const city = await City.findByPk(idCiudad);
  await city.addIndividual(newIndividual);
  //Condicion
  const condition = await Condition.findByPk(idCondicion);
  await condition.addIndividual(newIndividual);
  //Acta
  const act = await Report.findByPk(idActa);
  await act.addIndividual(newIndividual);
  //Vehiculo
  await Promise.all(
    idVehiculo.map(async (vehiculo) => {
      const vehicle = await Vehicle.findByPk(vehiculo);
      await vehicle.addIndividual(newIndividual);
    })
  );

  //Powers
  await Promise.all(
    powers.map(async (power) => {
      const pow = await Power.findByPk(power);
      await newIndividual.addPower(pow);
    })
  );

  return { ...newIndividual.toJSON() };
};

module.exports = createIndividual;
