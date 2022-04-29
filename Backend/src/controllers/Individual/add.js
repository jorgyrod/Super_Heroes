const createIndividual = require("./utils/createIndividual.js");

const add = async (req, res, next) => {
  createIndividual(req.body)
    .then((item) => res.status(201).json(item))
    .catch((err) => next(err));
};

module.exports = add;
