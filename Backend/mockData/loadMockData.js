const act = require("./data/act.json");
const categories = require("./data/categories.json");
const condition = require("./data/condition.json");
const power = require("./data/power.json");
const typeVehicles = require("./data/typeVehicles.json");
const vehicles = require("./data/vehicles.json");
const cities = require("./data/city.json");
const individuals = require("./data/individual.json");
const axios = require("axios");

const {
  Category,
  Condition,
  Country,
  Individual,
  Power,
  Report,
  Type,
} = require("../src/db.js");

const createCity = require("../src/controllers/City/utils/createCity");
const createVehicle = require("../src/controllers/Vehicle/utils/createVehicle");
const createIndividual = require("../src/controllers/Individual/utils/createIndividual");

const loadMockData = async () => {
  console.log("Loading Mock Data...");

  await Report.bulkCreate(act);
  await Category.bulkCreate(categories);
  await Condition.bulkCreate(condition);
  await Power.bulkCreate(power);
  await countriesAdd();
};

const countriesAdd = async () => {
  const countries = await axios.get(`https://restcountries.com/v3/all`);

  const newCountry = await Country.create({
    id: "C00",
    nombre: "No tiene pais",
    foto: "",
  });

  await Promise.all(
    countries.data.map((country) => {
      let data = {
        id: country.cca3,
        nombre: country.name.common,
        foto: country.flags[0],
      };
      Country.findOrCreate({ where: data });
    })
  );

  cities.forEach(async (city) => await createCity(city));
  vehiclesAdd();
  
};

const vehiclesAdd = async () => {
  await Promise.all(
    typeVehicles.map((type) => {
      let data = {
        id: type.id,
        nombre: type.nombre,
      };
      Type.create(data);
    })
  );
  vehicles.forEach(async (vehicle) => await createVehicle(vehicle));
  
  individuals.forEach(async (individual) => await createIndividual(individual));
};

module.exports = loadMockData;
