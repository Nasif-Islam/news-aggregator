const { fetchUsers } = require("../models/users-model");

exports.getUsersService = async () => {
  return await fetchUsers();
};
