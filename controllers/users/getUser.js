const User = require("../../models/users/users.schema");

const getUser = async (req, res) => {
  const profile = req.profile;
  try {
    const user = await User.findOne({ orgNumber: profile?.orgNumber });
    res.send(user).status(200);
  } catch (err) {
    res.send({ msg: err.message }).status(400);
  }
};

module.exports = { getUser };
