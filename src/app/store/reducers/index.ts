import { ActionReducerMap } from '@ngrx/store';
import * as fromFlightDetails from './flight-details.reducer';
import * as fromAirports from './airport.reducer';

export interface AppState {
  flightDetails: fromFlightDetails.FlightDetailsState;
  airports: fromAirports.AirportsState;
}

export const reducers: ActionReducerMap<AppState> = {
  flightDetails: fromFlightDetails.reducer,
  airports: fromAirports.reducer
};

