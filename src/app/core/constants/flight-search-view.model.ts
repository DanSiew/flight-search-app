import { TextInputModel } from "src/app/core/models";

const txtInputDepartAirport: TextInputModel = {
  inputName: "departureAirportCode",
  inputLabel: "Departure airport code *",
  minLength: 3,
  maxLength: 3,
  isRequired: true,
  maxDate: "",
  minDate: "",
  max: 0,
  min: 0,
  hasMax: false,
  decimalPlace: 0,
  isCap: true,
};

const txtInputArrivalAirport: TextInputModel = {
  inputName: "arrivalAirportCode",
  inputLabel: "Arrival airport code *",
  minLength: 3,
  maxLength: 3,
  isRequired: true,
  maxDate: "",
  minDate: "",
  max: 0,
  min: 0,
  hasMax: false,
  decimalPlace: 0,
  isCap: true,
};

const curDate = new Date();
curDate.setDate(curDate.getDate() + 2);

const txtInputDepartDate: TextInputModel = {
  inputName: "departureDate",
  inputLabel: "Departure date *",
  minLength: 6,
  maxLength: 20,
  isRequired: true,
  maxDate: new Date(3000, 1, 1),
  minDate: curDate,
  max: 0,
  min: 0,
  hasMax: false,
  decimalPlace: 0,
  isCap: false,
};

const txtInputReturnDate: TextInputModel = {
  inputName: "returnDate",
  inputLabel: "Return date *",
  minLength: 6,
  maxLength: 20,
  isRequired: true,
  maxDate: new Date(3000, 1, 1),
  minDate: curDate,
  max: 0,
  min: 0,
  hasMax: false,
  decimalPlace: 0,
  isCap: false,
};

const title = "Flight Search";
const emptyResultMessage = "Unable to find the any flights.";
const errorMessage = "System error, please refer to customer support.";
const buttonSearch = "Search";
const buttonReset = "Reset";

export const FlightSearchViewModel = {
  title,
  emptyResultMessage,
  errorMessage,
  buttonSearch,
  buttonReset,
  txtInputDepartAirport,
  txtInputArrivalAirport,
  txtInputDepartDate,
  txtInputReturnDate,
};
