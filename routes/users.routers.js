const usersRouter = require("express").Router();

const { getUsers } = require("../controllers/users.controller");

usersRouter.get("api/users", getUsers);
