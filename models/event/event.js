const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    meet_name: {
      type: String,
      require: true,
    },

    meet_type: {
      type: String,
      require: false,
    },

    host_name: {
      type: String,
      require: true,
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    orgNumber: {
      type: String,
      require: true,
    },
    on_off: {
      type: Boolean,
      require: false,
      default: true,
    },
    canceled: {
      type: Boolean,
      require: false,
    },
    canceled_reason: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("event", eventSchema);

module.exports = Event;
