const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const meet_time = {
//   // this is the formate of meet time
//   sun: [],
//   mon: [{ start: "9:00am", end: "5:00pm" }],
//   tue: [],
//   wed: [],
//   thu: [],
//   fri: [],
//   sat: [],
// };

const meet_timeSchema = new Schema({
  meet_time: {
    type: Object,
    require: false,
  },
  sun: {
    type: Array,
    require: false,
  },
  mon: {
    type: Array,
    require: false,
  },
  tue: {
    // sun or frome
    type: Array,
    require: false,
  },
  wed: {
    type: Array,
    require: false,
  },
  thu: {
    type: Array,
    require: false,
  },

  fri: {
    type: Array,
    require: false,
  },
  sat: {
    type: Array,
    require: false,
  },
  event_id: {
    type: mongoose.Schema.ObjectId,
    require: true,
  },
});

const Event_meet_time = mongoose.model("meet_time", meet_timeSchema);

module.exports = Event_meet_time;
