import { Action, createReducer, on } from '@ngrx/store';
import { Airport } from 'src/app/core/models';
import * as AirportsActions from '../actions';

export interface AirportsState {
  airports: Airport[];
  loading: boolean;
  error: boolean;
  loaded: boolean;
}

export const initialState: AirportsState = {
  airports: [],
  loading: false,
  error: false,
  loaded: false
};


const airportsReducer = createReducer(
  initialState,
  on(AirportsActions.getAirports, state => ({ ...state, loading: true, loaded: false, error: false })),
  on(AirportsActions.getAirportsError, state => ({ ...state, loading: false, error: true })),
  on(AirportsActions.getAirportsSuccess, (state, { airports }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: false,
    airports
  })),
  on(AirportsActions.setAirportLoading, (state, { loading }) => ({
    ...state,
    error: false,
    loaded: false,
    loading: loading == null ? true : loading
  }))
);

export function reducer(state: AirportsState | undefined, action: Action) {
  return airportsReducer(state, action);
}
