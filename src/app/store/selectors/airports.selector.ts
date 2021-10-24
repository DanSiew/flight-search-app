import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import { AirportsState } from '../reducers/airport.reducer';

// selectors
const getEntityState = createFeatureSelector<AppState>('entityCache');

const getAirportsState = createSelector(
  getEntityState,
  (state: AppState) => state.airports
);

const getAllAirports = createSelector(
  getAirportsState,
  (state: AirportsState) => state.airports
);

const getAirportsLoading = createSelector(
  getAirportsState,
  (state: AirportsState) => state.loading
);

const getAirportsLoaded = createSelector(
  getAirportsState,
  (state: AirportsState) => state.loaded
);

const hasError = createSelector(
  getAirportsState,
  (state: AirportsState) => state.error
);

@Injectable()
export class AirportsSelectors {
  constructor(private store: Store<AppState>) { }

  allAirports$ = this.store.select(getAllAirports);
  airportsState$ = this.store.select(getAirportsState);
  loading$ = this.store.select(getAirportsLoading);
  loaded$ = this.store.select(getAirportsLoaded);
  hasError$ = this.store.select(hasError);
}
