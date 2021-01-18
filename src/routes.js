const express = require("express");
const router = express.Router();
const orderBy = require("lodash/sortBy");
const kebabCase = require("lodash/kebabCase");
const groupBy = require("lodash/groupBy");

const cars = require("../data/vehicles.json").map((car) => {
  const slug = kebabCase(`${car.year} ${car.make} ${car.model}`);
  const makeSlug = kebabCase(car.make);
  const makeModel = `${car.make} ${car.model}`;
  const makeModelSlug = kebabCase(`${car.make} ${car.model}`);
  const yearSlug = kebabCase(car.year);

  return {
    ...car,
    slug,
    link: `/${slug}`,
    makeSlug,
    makeLink: `/makes/${makeSlug}`,
    makeModel,
    makeModelSlug,
    makeModelLink: `/models/${makeModelSlug}`,
    yearSlug,
    yearLink: `/years/${yearSlug}`,
  };
});

const byMake = groupBy(cars, "makeSlug");
const byMakeModel = groupBy(cars, "makeModelSlug");
const byYear = groupBy(cars, "yearSlug");

const sortedMakes = orderBy(
  Object.keys(byMake),
  (make) => -byMake[make].length,
  "desc"
);
const makes = sortedMakes.map((make) => {
  const makeCars = byMake[make];
  const car = makeCars[0];
  return {
    slug: make,
    name: car.make,
    link: car.makeLink,
    count: makeCars.length,
  };
});

router.get("/", (req, res) => {
  res.render("index", {
    count: cars.length,
    makes,
  });
});

module.exports = router;
