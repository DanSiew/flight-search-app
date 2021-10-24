import { Action, createReducer, on } from '@ngrx/store';
import { FlightResult } from 'src/app/core/models';
import * as FlightDetailsActions from '../actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface FlightDetailsState extends EntityState<FlightResult> {
  loading: boolean;
  error: boolean;
  loaded: boolean;
}
export const adapter: EntityAdapter<FlightResult> = createEntityAdapter<FlightResult>();

export const initialState: FlightDetailsState = adapter.getInitialState({
  loading: false,
  error: false,
  loaded: false
});


const FlightDetailsReducer = createReducer(
  initialState,
  on(FlightDetailsActions.getFlightDetails, state => ({ ...state, loading: true, loaded: false, error: false })),
  on(FlightDetailsActions.getFlightDetailsError, state => ({ ...state, loading: false, error: true })),
  on(FlightDetailsActions.getFlightDetailsSuccess, (state, action) =>
    adapter.addOne(action.flightResult, { ...state, loading: false, loaded: true, error: false, })),
  on(FlightDetailsActions.setFlightDetailsLoading, (state, { loading }) => ({
    ...state, loading: loading == null ? true : loading,
    error: false,
    loaded: false
  }))
);

export function reducer(state: FlightDetailsState | undefined, action: Action) {
  return FlightDetailsReducer(state, action);
}
