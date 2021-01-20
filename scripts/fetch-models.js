const _ = require("lodash");
const fetch = require("node-fetch");
const fs = require("fs");

const makes = require("../data/dot-makes.json");
const cars = require("../data/epa-vehicles.json");

const carMakes = _.uniq(cars.map((car) => car.make));
const knownMakes = makes.filter((make) =>
  carMakes.find(
    (carMake) => carMake.toLowerCase() === make.Make_Name.toLowerCase()
  )
);

let models = [];

console.log("known makes", knownMakes.length);

Promise.all(
  knownMakes.map(async (make) => {
    console.log("fetching models for make", make);

    const res = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/${make.Make_ID}?format=json`
    );
    const json = await res.json();

    console.log("got models", json.Count);
    models = [...models, ...json.Results];
  })
).then(() => {
  console.log("done fetching, writing to file");
  fs.writeFileSync(
    `${__dirname}/../data/dot-models.json`,
    JSON.stringify(models)
  );
});
