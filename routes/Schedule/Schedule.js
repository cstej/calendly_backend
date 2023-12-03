const { isAuth } = require("../../Middlewares/isAuth");
const express = require("express");
const { ScheduleEvent, GetScheduled, GetAllSchedule, ParticularEvent } = require("../../controllers/Schedule/Schedule");

const eventSchedule = express.Router();

eventSchedule.post("/book", ScheduleEvent);

eventSchedule.get("/get_booked/:id", GetAllSchedule);

eventSchedule.get("/get_schdule", isAuth, ParticularEvent);
module.exports = eventSchedule;
