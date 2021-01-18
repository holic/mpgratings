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

module.exports = router;
