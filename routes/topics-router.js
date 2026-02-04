const topicsUser = require("express").Router();
const getUsers = require("../controllers/topics.controller");

topicsUser.use("/api/users", getUsers);
