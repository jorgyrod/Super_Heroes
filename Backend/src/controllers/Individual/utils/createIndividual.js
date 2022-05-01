const {
  Category,
  City,
  Condition,
  Individual,
  Power,
  Report,
  Vehicle,
} = require("../../../db");

const addPhotos = require("./addPhotos.js");

const createIndividual = async (data) => {
  const {
    nombre,
    apellido,
    apodo,
    idCategoria,
    idCiudad,
    idCondicion,
    idActa,
    idVehiculo,
    idPoder,
    fotos,
  } = data;

  const newIndividual = await Individual.create({
    nombre,
    apellido,
    apodo
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
  if(idVehiculo !== ""){
    await Promise.all(
      idVehiculo.map(async (vehiculo) => {
        const vehicle = await Vehicle.findByPk(vehiculo);
        await newIndividual.addVehicle(vehicle);
      })
    );
  }

  //Powers
  await Promise.all(
    idPoder.map(async (poder) => {
      const pow = await Power.findByPk(poder);
      await newIndividual.addPower(pow);
    })
  );

  return { ...newIndividual.toJSON() };
};

module.exports = createIndividual;
