const express = require("express");
const orderBy = require("lodash/orderBy");
const router = express.Router();
const { cars, makes, makeModels, makeModelYears, years } = require("./cars");

const sum = (items) => items.reduce((total, item) => total + +item, 0);
const mean = (items) => sum(items) / items.length;
const median = (items) => {
  const sorted = items.slice().sort();
  const count = sorted.count;
  return count % 2 === 0
    ? (sorted[count / 2] + sorted[count / 2 - 1]) / 2
    : sorted[(count - 1) / 2];
};

router.get("/", (req, res) => {
  res.render("index", {
    cars,
    makes,
    models: makeModels,
    years,
  });
});

router.get("/:makeModelYearSlug", (req, res, next) => {
  const makeModelYear = makeModelYears.find(
    (m) => m.slug === req.params.makeModelYearSlug
  );
  if (!makeModelYear) {
    // TODO: better 404 page
    return next();
  }

  const variants = cars.filter(
    (mm) => mm.makeModelYearSlug === req.params.makeModelYearSlug
  );

  const mpgCity = mean(
    variants.map((variant) => variant.city08).filter(Boolean)
  );
  const mpgHighway = mean(
    variants.map((variant) => variant.highway08).filter(Boolean)
  );
  const isElectric = variants[0].fuelType1 === "Electricity";

  res.render("car", {
    makeModelYear,
    variants,
    mpgCity,
    mpgHighway,
    isElectric, // boogie woogie woogie
  });
});

router.get("/makes", (req, res) => {
  res.render("makes", {
    makes: orderBy(makes, "name"),
  });
});

router.get("/makes/:makeSlug", (req, res, next) => {
  const make = makes.find((m) => m.slug === req.params.makeSlug);
  if (!make) {
    // TODO: better 404 page
    return next();
  }

  const models = makeModels.filter((mm) => mm.makeSlug === req.params.makeSlug);

  res.render("make", {
    make,
    models: orderBy(models, "name"),
  });
});

router.get("/models", (req, res) => {
  res.render("models", {
    models: orderBy(makeModels, "name"),
  });
});

router.get("/models/:makeModelSlug", (req, res, next) => {
  const model = makeModels.find((m) => m.slug === req.params.makeModelSlug);
  if (!model) {
    // TODO: better 404 page
    return next();
  }

  const modelYears = makeModelYears.filter(
    (mm) => mm.makeModelSlug === req.params.makeModelSlug
  );

  res.render("model", {
    model,
    cars: modelYears,
  });
});

router.get("/model-years", (req, res) => {
  res.render("years", {
    years,
  });
});

router.get("/model-years/:yearSlug", (req, res, next) => {
  const year = years.find((m) => m.slug === req.params.yearSlug);
  if (!year) {
    // TODO: better 404 page
    return next();
  }

  const yearMakes = makes.filter((make) =>
    make.cars.find((car) => car.yearSlug === req.params.yearSlug)
  );
  const yearMakeModels = makeModels.filter((model) =>
    model.cars.find((car) => car.yearSlug === req.params.yearSlug)
  );

  res.render("year", {
    year,
    makes: yearMakes,
    models: yearMakeModels,
  });
});

module.exports = router;
