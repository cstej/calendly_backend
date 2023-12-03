const express = require("express");
const createUserController = require("../../controllers/users/createUser.controller");
const getUserController = require("../../controllers/users/getUserController");
const userLoginController = require("../../controllers/users/userLoginController");
const forUserFirstLetter = require("../../controllers/users/forUserFirstLetter");
const userLogoutController = require("../../controllers/users/useLogout");
const { isAuth } = require("../../Middlewares/isAuth");
const userName = require("../../controllers/users/userName");
const userEmail = require("../../controllers/users/userEmail");
const { getUser } = require("../../controllers/users/getUser");
const userRouter = express.Router();

userRouter.get("/user/first-letter", isAuth, forUserFirstLetter);
userRouter.get("/all_user", getUserController);
userRouter.post("/create_user", createUserController);
userRouter.post("/login", userLoginController);
userRouter.post("/logout", userLogoutController);

userRouter.get("/getLogedin", isAuth, getUser);

module.exports = userRouter;
