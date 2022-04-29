const { City, Country } = require("../../../db");

const createCity = async (data) => {
  const { id, nombre, idPais } = data;

  const newCity = await City.create({ id, nombre });

  const country = await Country.findByPk(idPais);
  country.addCity(newCity);

  return { ...newCity.toJSON() };
};

module.exports = createCity;
