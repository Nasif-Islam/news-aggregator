const { getUsersService } = require("../services/users-service");

exports.getUsers = async (req, res, next) => {
  const users = await getUsersService();
  res.status(200).send({ users: users });
};
