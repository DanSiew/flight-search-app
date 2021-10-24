import { createAction, props } from '@ngrx/store';
import { FlightRequest, FlightResult } from '../../core/models';

export const getFlightDetails = createAction('[FlightDetails] GET_FlightDetails', props<{ flightRequest: FlightRequest }>());

export const getFlightDetailsSuccess = createAction(
  '[FlightDetails] GET_FlightDetails_SUCCESS',
  props<{ flightResult: FlightResult }>()
);

export const getFlightDetailsError = createAction(
  '[FlightDetails] GET_FlightDetails_ERROR',
  props<{ error: any }>()
);

export const setFlightDetailsLoading = createAction(
  '[FlightDetails] SET_FlightDetails_LOADING',
  props<{ loading: boolean }>()
);
