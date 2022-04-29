const act = require("./data/act.json");
const categories = require("./data/categories.json");
const condition = require("./data/condition.json");
const power = require("./data/power.json");
const typeVehicles = require("./data/typeVehicles.json");
const vehicles = require("./data/vehicles.json");
const axios = require("axios");

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
  Photo,
} = require("../src/db.js");

const loadMockData = async () => {
  console.log("Loading Mock Data...");

  await Report.bulkCreate(act);
  await Category.bulkCreate(categories);
  await Condition.bulkCreate(condition);
  await Power.bulkCreate(power);
  await Type.bulkCreate(typeVehicles);
  await Vehicle.bulkCreate(vehicles);
  countriesAdd();
};

module.exports = loadMockData;

const countriesAdd = async () => {
  const countries = await axios.get(`https://restcountries.com/v3/all`);

  await Promise.all(
    countries.data.map((country) => {
      let data = {
          id: country.cca3,
          nombre: country.name.common,
      };
      Country.findOrCreate({ where: data });
    })
  );
};
