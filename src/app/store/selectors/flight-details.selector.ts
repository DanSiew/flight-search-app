import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import { FlightDetailsState } from '../reducers/flight-details.reducer';

// selectors
const getEntityState = createFeatureSelector<AppState>('entityCache');

export const getFlightDetailsState = createSelector(
  getEntityState,
  (state: AppState) => state.flightDetails
);

export const hasFlightDetails = (id: string) => createSelector(
  getFlightDetailsState,
  (state: FlightDetailsState) => state.entities[id].depFlightDetails.length > 0
);

export const getFlightDetails = (id: string) => createSelector(
  getFlightDetailsState,
  (state: FlightDetailsState) => state.entities[id]
);

export const getFlightDetailsLoading = createSelector(
  getFlightDetailsState,
  (state: FlightDetailsState) => state.loading
);

export const getFlightDetailsLoaded = createSelector(
  getFlightDetailsState,
  (state: FlightDetailsState) => state.loaded
);

const hasError = createSelector(
  getFlightDetailsState,
  (state: FlightDetailsState) => state.error
);

@Injectable()
export class FlightDetailsSelectors {

  constructor(private store: Store<AppState>) { }
  flightDetailsState$ = this.store.select(getFlightDetailsState);
  loading$ = this.store.select(getFlightDetailsLoading);
  loaded$ = this.store.select(getFlightDetailsLoaded);
  hasError$ = this.store.select(hasError);
  hasFlightDetails$ = (id: string) => this.store.select(hasFlightDetails(id));
  getFlightDetails$ = (id: string) => this.store.select(getFlightDetails(id));
}
