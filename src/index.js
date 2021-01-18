const express = require("express");
const nunjucks = require("nunjucks");
const app = express();
const routes = require("./routes");

const port = process.env.PORT || 5000;

app.set("view engine", "html");
nunjucks.configure(`${__dirname}/views`, {
  autoescape: true,
  express: app,
  noCache: process.env.NODE_ENV !== "production",
});

app.use(routes);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
