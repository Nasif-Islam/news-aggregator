const {} = require("../services/users.services");

exports.functionName = (req, res) => {
  functionFromService().then((data) => {
    // retrieve logic from service layer
    res.status(200).send({ data }); // return an appropriate response
  });
};
