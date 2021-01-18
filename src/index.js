const express = require("express");
const nunjucks = require("nunjucks");
const app = express();

const port = process.env.PORT || 5000;

app.set("view engine", "html");
nunjucks.configure(`${__dirname}/views`, {
  autoescape: true,
  express: app,
});

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
