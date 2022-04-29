require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

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
} = sequelize.models;

//Country - City 1:n
Country.hasMany(City);
City.belongsTo(Country);

//Vehiculo - Tipo Vehiculo n:1
Type.hasMany(Vehicle);
Vehicle.belongsTo(Type);

//Categoria - Individuo 1:n
Category.hasMany(Individual);
Individual.belongsTo(Category);

//Registro - Individuo 1:n
Report.hasMany(Individual);
Individual.belongsTo(Report);

//Condicion - Individuo 1:n
Condition.hasMany(Individual);
Individual.belongsTo(Condition);

//Individuo - Vehiculo 1:n
Individual.hasMany(Vehicle);
Vehicle.belongsTo(Individual);

//Individuo - Ciudad n:1
City.hasMany(Individual);
Individual.belongsTo(City);

//Individuo - Poder n: n
Individual.belongsToMany(Power, { through: "individual_power" });
Power.belongsToMany(Individual, { through: "individual_power" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
