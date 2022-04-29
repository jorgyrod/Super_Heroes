const {
  Category,
  City,
  Condition,
  Individual,
  Power,
  Report,
  Vehicle,
} = require("../../db");

const addPhotos = require("./addPhotos.js");

const createIndividual = async (data) => {
  const {
    nombre,
    apellido,
    idCategoria,
    idCiudad,
    idCondicion,
    idActa,
    idVehiculo,
    poder,
    fotos,
  } = data;

  const newIndividual = await Individual.create({
    nombre,
    apellido,
  });

  //Fotos
  addPhotos(fotos, newIndividual);
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
    poder.map(async (poder) => {
      const pow = await Power.findByPk(poder);
      await newIndividual.addPower(pow);
    })
  );

  return { ...newIndividual.toJSON() };
};

module.exports = createIndividual;
