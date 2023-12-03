const ZoomTokenModel = require("../../../models/Integration/Zoom/TokenModel");

const CreateZoomMeeting = async (req, res) => {
  const access_token = await ZoomTokenModel.find();
  console.log(access_token, "token");
  res.send(access_token).status(200);
};

module.exports = { CreateZoomMeeting };
