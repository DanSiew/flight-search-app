/*
This uses json-server, but with the module approach: https://github.com/typicode/json-server#module
Downside: You can't pass the json-server command line options.
Instead, can override some defaults by passing a config object to jsonServer.defaults();
You have to check the source code to set some items.
Examples:
Validation/Customization: https://github.com/typicode/json-server/issues/266
Delay: https://github.com/typicode/json-server/issues/534
ID: https://github.com/typicode/json-server/issues/613#issuecomment-325393041
Relevant source code: https://github.com/typicode/json-server/blob/master/src/cli/run.js
*/

/* eslint-disable no-console */
const moment = require('moment');
const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));
const { combineFlights } = require("./combineFlights");
const mockAirports = require("./mockAirports");
const { airports } = mockAirports;

// Can pass a limited number of options to this to override (some) defaults. See https://github.com/typicode/json-server#api
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser. Using JSON Server's bodyParser
server.use(jsonServer.bodyParser);

// Simulate delay on all requests
server.use(function (req, res, next) {
  setTimeout(next, 2000);
});

// Declaring custom routes below. Add custom routes before JSON Server router

// Add createdAt to all POSTS
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

server.get("/flightSearch", function (req, res) {
  const depDate = moment(req.query.departureDate, "YYYY-MM-DD");
  const depDay = depDate.day();
  const retDate = moment(req.query.returnDate, "YYYY-MM-DD");
  const retDay = retDate.day();

  const combineResult = combineFlights();
  const depResult = combineResult.filter(
    f =>
      f.departAirport === req.query.departureCode &&
      f.arriveAirport === req.query.arrivalCode &&
      f.day === depDay
  );
  const retResult = combineResult.filter(
    f =>
      f.departAirport === req.query.arrivalCode &&
      f.arriveAirport === req.query.departureCode &&
      f.day === retDay
  );

  const detAirport = airports.find(a => a.code === req.query.departureCode);
  const retAirport = airports.find(a => a.code === req.query.arrivalCode);

  result = {
    id: req.query.id,
    departureCode: req.query.departureCode,
    departureTitle: 'Departing ' + detAirport.city + ' on ' + depDate.format('DD MMM YYYY'),
    departureDate: depDate,
    depFlightDetails: depResult,
    returnCode: req.query.arrivalCode,
    returnTitle: 'Returning ' + retAirport.city + ' on ' + retDate.format('DD MMM YYYY'),
    returnDate: retDate,
    retFlightDetails: retResult
  };
  res.jsonp(result);
});

// Use default router
server.use(router);

// Start server
const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

// Centralized logic

// Returns a URL friendly slug
function createSlug(value) {
  return value
    .replace(/[^a-z0-9_]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

