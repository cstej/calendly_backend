const User = require("../../models/users/users.schema")
const userName= async (req, res) => {
    try {
      // Retrieve user information from the middleware
      const user = req.profile;
  
      // Extract the first letter of the user's name
      const firstLetter = user.name;
  
      // Send the first letter as a response
      res.json({ success: true, firstLetter });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  module.exports=userName