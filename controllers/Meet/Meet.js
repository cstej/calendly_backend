const EventDetails = require("../../models/event/edit_event.modal");
const Event = require("../../models/event/event");
const Event_meet_time = require("../../models/event/meet_time");
const EventSchedule = require("../../models/schedule/schedule");

//
const GetMeetDetail = async (req, res) => {
  const params = req.params;
  const host_name = params.host_name.toLowerCase();
  const event_name = params.event_name;
  const orgNumber = params.orgNumber;

  try {
    const result = await Event.aggregate([
      {
        $match: {
          host_name: host_name,
          orgNumber: orgNumber,
          on_off: true,
        },
      },
      {
        $lookup: {
          from: "event_details",
          localField: "_id",
          foreignField: "event_id",
          as: "eventDetails",
        },
      },
      {
        $unwind: "$eventDetails",
      },
      {
        $match: {
          "eventDetails.event_name": event_name,
        },
      },
    ]);
    res.status(200).send(result[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

const GetMeetTime = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Event_meet_time.findOne({ event_id: id });
    res.send(data).status(200);
  } catch (err) {
    res.send({ msg: err.message }).status(500);
  }
};

// getting time for meet
const GetAvailableTime = async (req, res) => {
  const { date, day } = req.query;
  const { id } = req.params;

  try {
    const scheduleData = await EventSchedule.find({ event_id: id, date, day });
    const time = scheduleData.map((ele) => ele.time);

    const meetTime = (await Event_meet_time.findOne({ event_id: id }))[day] || [];

    const uniqueTimes = new Set(time.map((item) => `${item.start}-${item.end}`));
    const fildata = meetTime.filter((item) => !uniqueTimes.has(`${item.start}-${item.end}`));

    res.status(200).send(fildata);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

module.exports = {
  GetMeetDetail,
  GetMeetTime,
  GetAvailableTime,
};
