import { HeartRateSensor } from "heart-rate";

let document = require("document");

// Fetch UI elements we will need to change
let hrLabel = document.getElementById("hrm");
let updatedLabel = document.getElementById("updated");

// Keep a timestamp of the last reading received. Start when the app is started.
let lastValueTimestamp = Date.now();

let hrm = new HeartRateSensor();

// Initialize the UI with some values
hrLabel.text = "--";
updatedLabel.text = "...";

// This function takes a number of milliseconds and returns a string
// such as "5min ago".
function convertMsAgoToString(millisecondsAgo) {
  if (millisecondsAgo < 120*1000) {
    return Math.round(millisecondsAgo / 1000) + "s ago";
  }
  else if (millisecondsAgo < 60*60*1000) {
    return Math.round(millisecondsAgo / (60*1000)) + "min ago";
  }
  else {
    return Math.round(millisecondsAgo / (60*60*1000)) + "h ago"
  }
}

// Create a new instance of the HeartRateSensor object
var hrm = new HeartRateSensor();

// Begin monitoring the sensor
hrm.start();

function refreshData() {
  // Updates the label on the display that shows when data was last updated.
  if (lastValueTimestamp !== undefined) {
    updatedLabel.text = convertMsAgoToString(Date.now() - lastValueTimestamp);
  }

  let data = {
    hrm: {
      heartRate: hrm.heartRate ? hrm.heartRate : 0
    }
  };
  console.log("Current heart rate: " + data.hrm.heartRate);
  hrLabel.text = JSON.stringify(data.hrm.heartRate);
  lastValueTimestamp = Date.now();
}

refreshData();

// And update the display every second
setInterval(refreshData, 1000);
