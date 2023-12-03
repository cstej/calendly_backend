const express = require("express");
const { CreateEvent, CreateEventDetails, GetEventDetails, GetEventData, UpdateEvent, DeleteEvent } = require("../../controllers/Event/Event");
const { isAuth } = require("../../Middlewares/isAuth");
const eventRoute = express.Router();

// Event
eventRoute.post("/create", isAuth, CreateEvent);

// event Details
eventRoute.post("/create_details/:id/:orgNumber", isAuth, CreateEventDetails);
eventRoute.get("/get_details/:id/:orgNumber", isAuth, GetEventDetails);
// Update the event
eventRoute.patch("/update/:id", isAuth, UpdateEvent);
eventRoute.delete("/delete/:id", isAuth, DeleteEvent);
//
eventRoute.get("/event_data", isAuth, GetEventData);

module.exports = eventRoute;
