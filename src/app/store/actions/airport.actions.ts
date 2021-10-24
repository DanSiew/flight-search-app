import { createAction, props } from '@ngrx/store';
import { Airport } from 'src/app/core/models';

export const getAirports = createAction('[Airport] GET_Airports');

export const getAirportsSuccess = createAction(
  '[Airport] GET_Airports_SUCCESS',
  props<{ airports: Airport[] }>()
);

export const getAirportsError = createAction(
  '[Airport] GET_Airport_ERROR',
  props<{ error: any }>()
);

export const setAirportLoading = createAction(
  '[Airport] SET_Airport_LOADING',
  props<{ loading: boolean }>()
);
