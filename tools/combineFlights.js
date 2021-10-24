
const mockFlightDepartures = require("./mockFlightDepartures");
const { flightDepartures } = mockFlightDepartures;
const mockFlightDetails = require("./mockFlightDetails");
const { flightDetails } = mockFlightDetails;
const mockFlightSchedules = require("./mockFlightSchedules");
const { flightSchedules } = mockFlightSchedules;

const innerJoin = (xs, ys, sel) =>
  xs.reduce(
    (zs, x) =>
      ys.reduce(
        (
          zs,
          y // cartesian product - all combinations
        ) => zs.concat(sel(x, y) || []), // filter out the rows and columns you want
        zs
      ),
    []
  );

function combineFlights() {
  const combFlightDetails = innerJoin(
    flightDetails,
    flightDepartures,
    (
      {
        id: fdId,
        airlineLogoAddress,
        airlineName,
        inboundFlightsDuration,
        itineraryId,
        outboundFlightsDuration,
        stop,
        totalAmount,
      },
      { id, departAirport, arriveAirport, flightDetailsId }
    ) =>
      flightDetailsId === fdId && {
        id,
        airlineLogoAddress,
        airlineName,
        inboundFlightsDuration,
        itineraryId,
        outboundFlightsDuration,
        stop,
        totalAmount,
        departAirport,
        arriveAirport,
        flightDetailsId
      }
  );
  const result = innerJoin(
    combFlightDetails,
    flightSchedules,
    (
      {
        id: uid,
        airlineLogoAddress,
        airlineName,
        inboundFlightsDuration,
        itineraryId,
        outboundFlightsDuration,
        stop,
        totalAmount,
        departAirport,
        arriveAirport,
        flightDetailsId
      },
      { id, flightDeparturesId, day }
    ) =>
      flightDeparturesId === uid && {
        id,
        airlineLogoAddress,
        airlineName,
        inboundFlightsDuration,
        itineraryId,
        outboundFlightsDuration,
        stop,
        totalAmount,
        departAirport,
        arriveAirport,
        flightDetailsId,
        flightDeparturesId,
        day
      }
  );

  return result;
}

module.exports = {
  combineFlights
};
