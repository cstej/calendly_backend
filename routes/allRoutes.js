const express = require("express");
const allRoutes = express.Router();
const userRouter = require("./users/users");
const eventRoute = require("./Event/Event");
const meetRouter = require("./Meet/meet");
const eventSchedule = require("./Schedule/Schedule");
const MailRoute = require("./Mail/Mail");
const ZoomAccessTokenRoute = require("./Integration/Zoom/accessToken");
const CreateZoomMeetingRoute = require("./Integration/Zoom/CreateMeeting");

allRoutes.use("/users", userRouter);

allRoutes.use("/event", eventRoute);

allRoutes.use("/meet", meetRouter);

allRoutes.use("/schedule", eventSchedule);

allRoutes.use("/mail", MailRoute);
allRoutes.use("/zoom",ZoomAccessTokenRoute)
allRoutes.use("/create",CreateZoomMeetingRoute)
module.exports = allRoutes;
