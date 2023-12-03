const Users = require("../../models/users/users.schema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/users/users.schema");
const JwtService = require("../../utils/JwtService");
const Joi = require("joi");
const expressAsyncHandler = require("express-async-handler");

const userLoginController = expressAsyncHandler(async (req, res) => {
  const cookieOptions = {
    maxAge: 172800000,
  };
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const { error, value: { email, password } = {} } = schema.validate(
      req.body
    );

    if (error) {
      return res.status(401).json({ success: false, message: error.message });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.authenticate(password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }

    if (user.status == "false") {
      return res
        .status(401)
        .json({ success: false, message: "Please Contact support!!" });
    }

    const { password: userPassword, ...userWithoutPassword } = user.toObject();
    const token = JwtService.sign({
      _id: user._id,
      role: user.role,
      email: user.email,
      orgNumber: user.orgNumber,
      branchId: user?.branchId,
      orgId: user.orgId,
    });

    res.cookie("token", token, cookieOptions).json({
      success: true,
      profile: userWithoutPassword,
    });
  } catch (error) {
    res.status(400).send({ message: error.message, status: false });
  }
});

module.exports = userLoginController;
