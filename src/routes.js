const express = require("express");
const router = express.Router();
const { cars, makes, makeModels } = require("./cars");

router.get("/", (req, res) => {
  res.render("index", {
    count: cars.length,
    makes,
  });
});

router.get("/makes", (req, res) => {
  res.render("makes", {
    makes,
  });
});

router.get("/makes/:makeSlug", (req, res) => {
  const make = makes.find((m) => m.slug === req.params.makeSlug);
  if (!make) {
    // TODO: better 404 page
    return res.status(404).send("Not found");
  }

  const models = makeModels.filter((mm) => mm.makeSlug === req.params.makeSlug);

  res.render("make", {
    make,
    models,
  });
});

router.get("/models", (req, res) => {
  res.render("models", {
    models: makeModels,
  });
});

router.get("/models/:makeModelSlug", (req, res) => {
  const model = makeModels.find((m) => m.slug === req.params.makeModelSlug);
  if (!model) {
    // TODO: better 404 page
    return res.status(404).send("Not found");
  }

  const modelYears = cars.filter(
    (mm) => mm.makeModelSlug === req.params.makeModelSlug
  );

  res.render("model", {
    model,
    cars: modelYears,
  });
});

module.exports = router;
