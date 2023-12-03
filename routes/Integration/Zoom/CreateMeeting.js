const express=require('express');
const { CreateZoomMeeting } = require('../../../controllers/Integration/Zoom/CreateMeeting');

const CreateZoomMeetingRoute=express.Router()

CreateZoomMeetingRoute.post("/zoommeeting",CreateZoomMeeting)

module.exports = CreateZoomMeetingRoute;