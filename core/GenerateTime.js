const moment = require("moment");

function generateTimeIntervals(duration, start, end) {
  const intervals = [];
  const startTime = moment(start, "h:mm A");
  const endTime = moment(end, "h:mm A");
  const durationInMinutes = getDurationInMinutes(duration);
  const breakDuration = 30; // 30-minute break

  while (startTime.isBefore(endTime)) {
    const interval = {
      start: formatTimeWithAMPM(startTime),
      end: formatTimeWithAMPM(startTime.clone().add(durationInMinutes, "minutes")),
    };

    intervals.push(interval);

    // Add a 30-minute break after the interval
    startTime.add(durationInMinutes, "minutes");
    if (startTime.isBefore(endTime)) {
      startTime.add(breakDuration, "minutes");
    }
  }

  return intervals;
}

function getDurationInMinutes(duration) {
  return typeof duration === "number" ? duration : getDefaultDuration();
}

function getDefaultDuration() {
  return 15; // Default to 15 minutes if no duration is provided
}

function formatTimeWithAMPM(time) {
  return time.format("h:mm A");
}

module.exports = { generateTimeIntervals };
