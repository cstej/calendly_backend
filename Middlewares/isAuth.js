const asyncHandler = require("express-async-handler");
const JwtService = require("../utils/JwtService");
const User = require("../models/users/users.schema");

module.exports.isAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token ?? req.headers.authorization?.split(" ")[1];

  if (!token) {
    return handleUnauthorized(res);
  }

  let decodedJwtPayload;
  try {
    decodedJwtPayload = JwtService.verify(token);
  } catch (error) {
    return handleUnauthorized(res);
  }

  const user = await User.findById(decodedJwtPayload._id)
    .select("-password")

  if (!user) {
    return handleUnauthorized(res);
  }

  if (user.status == "false") {
    return handleUnauthorized(res);
  }

  if (user.name === "superadmin") {
    req.findQuery = { orgNumber: req.orgNumber };
  }
   else {
    req.findQuery = { branchId: req.branchId };
  }

  req.profile = user;
  req.orgNumber = user.orgNumber;
  req.orgId = user.orgId;
  req.branchId = user.branchId;
  req.role = user;
  next();
});

const handleUnauthorized = (res) => {
  res
    .status(401)
    .cookie("token", null, { expires: new Date(Date.now()) })
    .clearCookie("token")
    .json({ success: false, message: "You are not authorized" });
};