const orderBy = require("lodash/sortBy");
const groupBy = require("lodash/groupBy");

const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[\W_]+/g, "-")
    .replace(/^-+|-+$/g, "");

const cars = require("../data/vehicles.json").map((car) => {
  const slug = slugify(`${car.year} ${car.make} ${car.model}`);
  const makeSlug = slugify(`${car.make}`);
  const makeModel = `${car.make} ${car.model}`;
  const makeModelSlug = slugify(`${car.make} ${car.model}`);
  const yearSlug = slugify(`${car.year}`);

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
  (slug) => -byMake[slug].length,
  "desc"
);
const makes = sortedMakes.map((slug) => {
  const filteredCars = byMake[slug];
  const car = filteredCars[0];
  return {
    slug,
    name: car.make,
    link: car.makeLink,
    count: filteredCars.length,
  };
});

const sortedMakeModels = orderBy(
  Object.keys(byMakeModel),
  (slug) => -byMakeModel[slug].length,
  "desc"
);
const makeModels = sortedMakeModels.map((slug) => {
  const filteredCars = byMakeModel[slug];
  const car = filteredCars[0];
  return {
    slug,
    name: car.makeModel,
    link: car.makeModelLink,
    make: car.make,
    makeSlug: car.makeSlug,
    makeLink: car.makeLink,
    count: filteredCars.length,
  };
});

module.exports = {
  cars,
  byMake,
  byMakeModel,
  byYear,
  makes,
  makeModels,
};
