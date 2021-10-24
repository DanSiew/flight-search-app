import { FlightResult } from 'src/app/core/models';

export const mockFlightResult: FlightResult = {
  depFlightDetails: [{
    airlineLogoAddress: '/assets/Images/AirlineLogo/QF.gif',
    airlineName: 'Qantas',
    arriveAirport: 'PEK',
    day: 2,
    departAirport: 'MEL',
    flightDeparturesId: 57,
    flightDetailsId: 29,
    id: 395,
    inboundFlightsDuration: '09:55',
    itineraryId: '',
    outboundFlightsDuration: '13:30',
    totalAmount: '450.00'
  }],
  departureCode: 'MEL',
  departureDate: '2019-11-25T13:00:00.000Z',
  departureTitle: 'Departing Melbourne on 26 Nov 2019',
  id: 'MELPEK15746868000001574946000000',
  retFlightDetails: [
    {
      airlineLogoAddress: '/assets/Images/AirlineLogo/QF.gif',
      airlineName: 'Qantas',
      arriveAirport: 'MEL',
      day: 5,
      departAirport: 'PEK',
      flightDeparturesId: 58,
      flightDetailsId: 29,
      id: 405,
      inboundFlightsDuration: '09:55',
      itineraryId: '',
      outboundFlightsDuration: '13:30',
      totalAmount: '450.00'
    }],
  returnCode: 'PEK',
  returnDate: '2019-11-28T13:00:00.000Z',
  returnTitle: 'Returning Beijing on 29 Nov 2019',
};
