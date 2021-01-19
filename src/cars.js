const orderBy = require("lodash/sortBy");
const groupBy = require("lodash/groupBy");

const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[\W_]+/g, "-")
    .replace(/^-+|-+$/g, "");

const cars = require("../data/cars.json").map((car) => {
  const makeSlug = slugify(`${car.make}`);
  const makeModel = `${car.make} ${car.model}`;
  const makeModelSlug = slugify(makeModel);
  const yearSlug = slugify(`${car.year}`);
  const makeModelYear = `${car.year} ${car.make} ${car.model}`;
  const makeModelYearSlug = slugify(makeModelYear);

  return {
    ...car,
    makeSlug,
    makeLink: `/makes/${makeSlug}`,
    makeModel,
    makeModelSlug,
    makeModelLink: `/models/${makeModelSlug}`,
    yearSlug,
    yearLink: `/model-years/${yearSlug}`,
    makeModelYear,
    makeModelYearSlug,
    makeModelYearLink: `/${makeModelYearSlug}`,
  };
});

const byMake = groupBy(cars, "makeSlug");
const byMakeModel = groupBy(cars, "makeModelSlug");
const byYear = groupBy(cars, "yearSlug");
const byMakeModelYear = groupBy(cars, "makeModelYearSlug");

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
    cars: filteredCars,
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
    cars: filteredCars,
  };
});

const makeModelYears = orderBy(Object.keys(byMakeModelYear))
  .reverse()
  .map((slug) => {
    const filteredCars = byMakeModelYear[slug];
    const car = filteredCars[0];
    return {
      slug,
      name: car.makeModelYear,
      link: car.makeModelYearLink,
      make: car.make,
      makeSlug: car.makeSlug,
      makeLink: car.makeLink,
      makeModel: car.makeModel,
      makeModelSlug: car.makeModelSlug,
      makeModelLink: car.makeModelLink,
      cars: filteredCars,
    };
  });

const years = orderBy(Object.keys(byYear))
  .reverse()
  .map((slug) => {
    const filteredCars = byYear[slug];
    const car = filteredCars[0];
    return {
      slug,
      name: car.year,
      link: car.yearLink,
      cars: filteredCars,
    };
  });

module.exports = {
  cars,
  byMake,
  byMakeModel,
  byYear,
  makes,
  makeModels,
  makeModelYears,
  years,
};
