const EventDetails = require("../../models/event/edit_event.modal");
const Event = require("../../models/event/event");
const Event_meet_time = require("../../models/event/meet_time");
const EventSchedule = require("../../models/schedule/schedule");
const { generateTimeIntervals } = require("../../core/GenerateTime");

// Create Event
const CreateEvent = async (req, res) => {
  const profile = req.profile;
  const payload = {
    ...req.body,
    orgNumber: profile.orgNumber,
    createdBy: profile._id,
  };

  const check = await Event.find({
    $and: [{ host_name: payload.host_name }, { orgNumber: profile.orgNumber }],
  });
  try {
    if (check.length > 0) {
      res.status(403).send({ msg: "Event Already Created" });
    } else {
      const data = await Event(payload);
      await data.save();
      res.send({ msg: "event success", data }).status(200);
    }
  } catch (err) {
    res.send({ msg: err.message }).status(500);
  }
};

// get Event and Event details in one for dashboard
const GetEventData = async (req, res) => {
  const profile = req.profile;
  try {
    const data = await Event.aggregate([
      {
        $lookup: {
          from: "event_details",
          localField: "_id",
          foreignField: "event_id",
          as: "eventDetails",
        },
      },
      {
        $match: {
          orgNumber: profile?.orgNumber,
        },
      },
    ]);
    res.send(data).status(200);
  } catch (err) {
    res.send({ msg: err.message }).status(500);
  }
};

// Create Event Details
const CreateEventDetails = async (req, res) => {
  try {
    const { params: p, profile, body } = req;

    const event = await Event.findOne({ _id: p.id });

    const event_link = `${p.orgNumber}/${event.host_name}/${body.event_name}`;

    const payload = {
      ...body,
      orgNumber: p.orgNumber,
      createdBy: profile._id,
      event_id: p.id,
      event_link,
    };

    const { meet_time, duration } = payload;

    const slotDuration = +duration.split(" ")[0]; // Extract the slot duration

    // console.log(payload);

    const obj = {};
    for (const key in meet_time) {
      const times = meet_time[key].flatMap(({ start, end }) => generateTimeIntervals(slotDuration, start, end));
      obj[key] = times;
    }

    const checkDuplicate = await EventDetails.findOne({ event_id: p.id, orgNumber: p.orgNumber });

    if (checkDuplicate) {
      return res.status(403).send({ msg: "Event Already Created" });
    }

    const location = {
      location_type: payload?.location_type,
      location_name: payload?.location_name,
      location_desc: payload?.location_desc,
      call_option: payload?.call_option,
      mobile_number: payload?.mobile_number,
    };

    const data = new EventDetails({ ...payload, location });
    await data.save();

    const eventMeetTimes = new Event_meet_time({ ...obj, event_id: p.id, meet_time });
    await eventMeetTimes.save();

    if (eventMeetTimes && data) {
      res.status(200).send({ msg: "Event created successfully", data: data });
    } else {
      res.status(752).send({ msg: "Something Went Wrong" });
    }

    // res.status(200).send({ msg: "Event created successfully" });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

// get event details single data
const GetEventDetails = async (req, res) => {
  const { id, orgNumber } = req?.params;

  try {
    const data = await EventDetails.findOne({
      $and: [{ event_id: id }, { orgNumber: orgNumber }],
    });
    res.send(data).status(200);
  } catch (err) {
    res.send({ msg: err.message }).status(500);
  }
};

// on off the evetn

const DeleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    // Use aggregation to identify related documents based on event_id
    const filter = {
      $or: [
        { event_id: id },
        { other_field_related_to_event_id: id }, // Add more related fields if needed
      ],
    };

    // Delete related documents using deleteMany
    await EventDetails.deleteMany(filter);
    await Event_meet_time.deleteMany(filter);
    await EventSchedule.deleteMany(filter);

    // Delete the main event document
    const data = await Event.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json({ msg: "Event not found" });
    }

    res
      .status(200)
      .json({ msg: "Event and related documents deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const UpdateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      host_name,
      meet_type,
      on_off,
      date_range,
      location,
      event_name,
      event_color,
      duration,
      gap_before,
      gap_after,
      meet_time: { meet_time: rawMeetTime } = {}, // destructuring meet_time
    } = req.body;

    // Process meet_time to generate intervals
    const obj = {};
    for (let key in rawMeetTime) {
      const times = rawMeetTime[key].flatMap(({ start, end }) => generateTimeIntervals(duration, start, end));
      obj[key] = times;
    }

    const updateEventData = { host_name, meet_type, on_off, date_range, location, event_name, event_color, duration, gap_before, gap_after };

    const updatedEvent = await Event.findByIdAndUpdate(id, updateEventData, { new: true });
    const updatedEventDetails = await EventDetails.updateMany({ event_id: id }, updateEventData);
    const updatedEventMeetTime = await Event_meet_time.updateMany({ event_id: id }, { ...obj, meet_time: rawMeetTime });
    if (updatedEvent && updatedEventDetails && updatedEventMeetTime) {
      res.status(200).send({ msg: "Event updated successfully" });
    } else {
      res.status(752).send({ msg: "Something Went Wrong !!" });
    }
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

module.exports = {
  CreateEvent,
  CreateEventDetails,
  GetEventDetails,
  GetEventData,
  UpdateEvent,
  DeleteEvent,
};
