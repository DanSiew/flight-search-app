import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as AirportsActions from '../actions';
import { Airport } from 'src/app/core/models';
import { AirportsDataService } from '../services/airports-data.services';


@Injectable()
export class AirportsEffects {

  constructor(
    private actions$: Actions,
    private airportsDataService: AirportsDataService
  ) { }

  getAirports$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AirportsActions.getAirports),
      switchMap(() =>
        this.airportsDataService.getAirports()
          .pipe(map((airports: Airport[]) =>
            AirportsActions.getAirportsSuccess({ airports })),
            catchError(error => of(AirportsActions.getAirportsError({ error })))
          )
      )
    )
  );
}
