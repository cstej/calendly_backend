const userLogoutController = async (req, res) => {
  try {
    if (req.cookies.token) {
      // console.log('Clearing cookie...')
      res.clearCookie("token");
      res.status(200).send({ message: "Logout successfully", status: true });
    } else {       
      res.send("No cookie found. You are already logged out.");
    }
  } catch (error) {
    res.status(400).send({ message: error.message, status: false });
  }
};

module.exports = userLogoutController;
