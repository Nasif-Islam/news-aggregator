const express = require("express");
const app = express();
const apiRouter = require("./routes/api-router");

app.use(express.json());

app.use("/api", apiRouter);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.msg || "Internal Server Error";

  res.status(status).send({ msg: message });
});

module.exports = app;
