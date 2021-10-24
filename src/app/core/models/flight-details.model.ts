export class FlightDetails {
  id: number;
  airlineLogoAddress: string;
  airlineName: string;
  inboundFlightsDuration: string;
  itineraryId: string;
  outboundFlightsDuration: string;
  totalAmount: string;
  departAirport: string;
  arriveAirport: string;
  flightDetailsId: number;
  flightDeparturesId: number;
  day: number;
}


export class FlightResult {
  id: string;
  departureCode: string;
  departureTitle: string;
  departureDate: string;
  depFlightDetails: FlightDetails[];
  returnCode: string;
  returnTitle: string;
  returnDate: string;
  retFlightDetails: FlightDetails[];
}
