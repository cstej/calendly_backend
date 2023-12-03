const express=require('express');
const { ZoomAccessToken } = require('../../../controllers/Integration/Zoom/Token');

const ZoomAccessTokenRoute=express.Router()

ZoomAccessTokenRoute.get("/accesstoken",ZoomAccessToken)

module.exports = ZoomAccessTokenRoute;

