/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const mockAirports = require("./mockAirports");
const { airports } = mockAirports;
const mockFlightDepartures = require("./mockFlightDepartures");
const { flightDepartures } = mockFlightDepartures;
const mockFlightDetails = require("./mockFlightDetails");
const { flightDetails } = mockFlightDetails;
const mockFlightSchedules = require("./mockFlightSchedules");
const { flightSchedules } = mockFlightSchedules;


const data = JSON.stringify({ flightDetails, airports, flightDepartures, flightSchedules });
const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, function (err) {
  err ? console.log(err) : console.log("Mock DB created.");
});
