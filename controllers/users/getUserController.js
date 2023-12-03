const Users = require("../../models/users/users.schema");

const getUserController = async (req, res) => {
  try {
    const users = await Users.find();
    return res
      .status(200)
      .send({ message: "data fetched", status: true, data: users });
  } catch (error) {
    return res.status(200).send({ message: error.message, status: true });
  }
};

module.exports = getUserController;
