import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as FlightDetailsActions from '../actions';
import { FlightResult } from 'src/app/core/models';
import { FlightDetailsDataService } from '../services/flight-details-data.services';


@Injectable()
export class FlightDetailsEffects {

  constructor(
    private actions$: Actions,
    private flightDetailsDataService: FlightDetailsDataService
  ) { }

  getFlightDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FlightDetailsActions.getFlightDetails),
      switchMap(action =>
        this.flightDetailsDataService.getFlightDetails(action.flightRequest)
          .pipe(map((flightResult: FlightResult) => {
            return FlightDetailsActions.getFlightDetailsSuccess({ flightResult });
          }),
            catchError(error => of(FlightDetailsActions.getFlightDetailsError({ error })))
          )
      )
    )
  );
}
