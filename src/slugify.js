const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[\W_]+/g, "-")
    .replace(/^-+|-+$/g, "");

module.exports = slugify;
