const express = require("express");
const router = express.Router();

const vehicles = require("../data/vehicles.json");

router.get("/", (req, res) => {
  const makes = {};
  vehicles.forEach((vehicle) => {
    makes[vehicle.make] = makes[vehicle.make] || [];
    makes[vehicle.make].push(vehicle);
  });
  res.render("index", {
    count: vehicles.length,
    makes: Object.keys(makes),
  });
});

module.exports = router;
