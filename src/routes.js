const express = require("express");
const router = express.Router();

const vehicles = require("../data/vehicles.json");

router.get("/", (req, res) => {
  res.render("index", { count: vehicles.length });
});

module.exports = router;
