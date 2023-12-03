const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  name: {
    type: String,
    required: true, // Corrected from "require" to "required"
  },
  guestEmail: {
    type: [String], // If this is an array of strings
    required: false,
  },
  email: {
    type: String,
    required: true, // Corrected from "require" to "required"
  },
  anything: {
    type: String,
    required: false, // Corrected from "require" to "required"
  },
  
  event_id: {
    type: mongoose.Schema.ObjectId,
    required: true, // Corrected from "require" to "required"
  },
  time: {
    type: Object,
    required: true, // Corrected from "require" to "required"
  },
  date: {
    type: String,
    required: true, // Corrected from "require" to "required"
  },
  phone: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  createdDate: {
    type: String,
    required: true,
  },
});

const EventSchedule = mongoose.model("schedule", scheduleSchema);

module.exports = EventSchedule;
