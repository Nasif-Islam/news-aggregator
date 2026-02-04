const express = require("express");
const app = express();
const topicsRouter = require("./routes/topics-router.js");
const commentsRouter = require("./routes/comments-router.js");
const articlesRouter = require("./routes/articles-router.js");
const usersRouter = require("./routes/users-router.js");

app.use(express.json());

app.use("/api", apiRouter);
app.use("/api/topics", topicsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/users", usersRouter);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, msg = "Internal Server Error" } = err;
  res.status(status).send({ msg: msg });
});

module.exports = app;
