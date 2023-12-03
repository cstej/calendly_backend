const express = require("express");
const { GetMeetDetail, GetMeetTime, GetAvailableTime } = require("../../controllers/Meet/Meet");

const meetRouter = express.Router();

meetRouter.get("/get_meet_data/:orgNumber/:host_name/:event_name", GetMeetDetail);
meetRouter.get("/get_meet_time/:id", GetMeetTime);

meetRouter.get("/get_available_time/:id", GetAvailableTime);

module.exports = meetRouter;
