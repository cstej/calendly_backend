const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meet_time = {
  // this is the formate of meet time
  sun: [],
  mon: ["9:00am", "5:00pm"],
  tue: [],
  wed: [],
  thu: [],
  fri: [],
  sat: [],
};

const locationType = new Schema({
  location_type: {
    type: String,
    require: true,
  },
  location_desc: {
    type: String,
    require: false,
  },
  call_option: {
    // to or frome
    type: String,
    require: false,
  },
  location_name: {
    type: String,
    require: false,
  },
  mobile_number: {
    type: String,
    require: false,
  },
});

const EventDetailsSchema = new Schema(
  {
    location: locationType, // done

    discription: {
      type: String,
      require: true,
    },
    event_link: {
      type: String,
      require: true,
    },
    event_name: {
      type: String,
      require: true,
    },
    event_color: {
      type: String,
      require: false,
    },
    duration: {
      type: String,
      require: true,
    },
    date_range: {
      // the event will get start
      type: Object,
      require: true,
    },

    gap_before: {
      type: String,
      require: false,
    },
    gap_after: {
      type: String,
      require: false,
    },

    //
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    orgNumber: {
      type: String,
      require: true,
    },
    event_id: {
      type: mongoose.Schema.ObjectId,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const EventDetails = mongoose.model("event_details", EventDetailsSchema);

module.exports = EventDetails;
