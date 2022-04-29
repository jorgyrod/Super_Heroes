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
  Photo
} = sequelize.models;

Individual.hasMany(Photo);
Photo.belongsTo(Individual);

Country.hasMany(City);
City.belongsTo(Country);

Type.hasMany(Vehicle);
Vehicle.belongsTo(Type);

Category.hasMany(Individual);
Individual.belongsTo(Category);

Report.hasMany(Individual);
Individual.belongsTo(Report);

Condition.hasMany(Individual);
Individual.belongsTo(Condition);

Individual.hasMany(Vehicle);
Vehicle.belongsTo(Individual);

City.hasMany(Individual);
Individual.belongsTo(City);

Individual.belongsToMany(Power, { through: "Individual_Power" });
Power.belongsToMany(Individual, { through: "Individual_Power" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
