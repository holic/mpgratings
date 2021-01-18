const express = require("express");
const router = express.Router();
const sortBy = require("lodash/sortBy");

const vehicles = require("../data/vehicles.json");
const makes = {};
vehicles.forEach((vehicle) => {
  makes[vehicle.make] = makes[vehicle.make] || [];
  makes[vehicle.make].push(vehicle);
});
const sortedMakes = sortBy(Object.keys(makes), (make) => -makes[make].length);

router.get("/", (req, res) => {
  res.render("index", {
    count: vehicles.length,
    makes: sortedMakes.map((make) => ({
      make,
      count: makes[make].length,
    })),
  });
});

module.exports = router;
