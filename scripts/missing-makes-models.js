const _ = require("lodash");
const cars = require("../data/epa-vehicles.json");
const database = require("../data/cars.json");

const allMakesModels = cars.map((car) => `${car.make} ${car.model}`);
const selectedMakesModels = database.map(
  (car) => `${car.make} ${car.modelVerbose}`
);

const diff = _.difference(allMakesModels, selectedMakesModels);
const counts = _.countBy(diff);

const missingModels = _.orderBy(
  Object.keys(counts),
  (value) => counts[value],
  "desc"
);

console.log(missingModels.map((model) => `${model} [${counts[model]}]`));
