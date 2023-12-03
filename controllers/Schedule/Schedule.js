const createZoomMeetingModel = require("../../models/Integration/Zoom/CreateMeeting");
const ZoomTokenModel = require("../../models/Integration/Zoom/TokenModel");
const EventDetails = require("../../models/event/edit_event.modal");
const Event = require("../../models/event/event");
const EventSchedule = require("../../models/schedule/schedule");

const ScheduleEvent = async (req, res) => {
  const frmateDate = (myDate) => {
    const originalDate = new Date(myDate);
    const day = originalDate.getDate();
    const month = originalDate.getMonth() + 1;
    const year = originalDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  const payload = {
    ...req.body,
    date: frmateDate(req.body.date),
    createdDate: new Date(),
  };

  const apiUrl = `https://api.zoom.us/v2/users/me/meetings`;
  const access_token = await ZoomTokenModel.find();
  // console.log(access_token[access_token.length-1],"token");
  const authorizationToken = `Bearer ${
    access_token[access_token.length - 1].access_token
  }`;
  console.log(authorizationToken, "authtoken");
  try {
    const find = await EventSchedule.findOne({
      $and: [
        { event_id: payload.event_id },
        { date: payload.date },
        { time: payload.time },
      ],
    });
    if (find) {
      res.status(403).send({ msg: "Event Already scheduled !!" });
    } else {
      const data = await EventSchedule(payload);
      await data.save();

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        mode: "cors",
        body: JSON.stringify({
          topic: "DIDM Course",
          start_time: "2023-11-09T18:30:00",
        }),
      });
      const resData = await response.json();

      const meeting = new createZoomMeetingModel({
        ...resData,
      });
      await meeting.save();
      // console.log("Response:", resData);
      res.send(data).status(200);
    }
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

const GetAllSchedule = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await EventSchedule.findOne({ _id: id });
    res.send(data).status(200);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

// neet to work here
// getting data after the event is scheduled
const GetScheduled = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await EventSchedule.aggregate([
      {
        $match: {
          _id: id, // Convert id to ObjectId if needed
        },
      },
      {
        $lookup: {
          from: "events", // Replace with the correct collection name
          localField: "_id",
          foreignField: "event_id",
          as: "eventData",
        },
      },
      {
        $unwind: "$eventData",
      },
    ]);

    // console.log("Data:", data);

    if (data.length === 0) {
      return res.status(404).json({ msg: "Scheduled event not found" });
    }

    res.status(200).json(data[0]); // Use the first result if there's only one match
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ msg: err.message });
  }
};

const ParticularEvent = async (req, res) => {
  const profile = req.profile;
  // console.log("working");

  try {
    const scheduleData = await EventDetails.aggregate([
      {
        $match: { orgNumber: profile.orgNumber },
      },
      {
        $lookup: {
          from: "schedules", // Assuming your EventSchedule collection is named 'eventschedules'
          localField: "event_id",
          foreignField: "event_id",
          as: "schedules",
        },
      },
      {
        $unwind: "$schedules",
      },
      {
        $project: {
          _id: 0, // Exclude _id field if you want
          event_id: 0, // Exclude event_id field if you want
          // Add other fields from Event and EventSchedule that you want in the result
        },
      },
    ]);

    console.log(scheduleData);
    res.send(scheduleData).status(200);
  } catch (err) {
    res.send({ msg: err.message }).status(500);
  }
};

module.exports = {
  ScheduleEvent,
  GetScheduled,
  GetAllSchedule,
  ParticularEvent,
};
