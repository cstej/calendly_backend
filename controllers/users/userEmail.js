const User = require("../../models/users/users.schema");
const userEmail = async (req, res) => {
  try {
    const user = req.profile;
    const email = user.email;
    res.json({ success: true, email });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = userEmail;
