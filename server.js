const express = require("express");
const compression = require("compression");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();

app.disable("x-powered-by");
app.use(compression());
// the __dirname is the current directory from where the script is running
app.use(express.static(path.join(__dirname, "dist")));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`express running on port:${port}`);
});
