import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { AppState } from '../reducers';
import * as AirportsActions from '../actions';
import { AirportsDataService } from './airports-data.services';


@Injectable()
export class AirportsDispatchers {

  constructor(
    private store: Store<AppState>,
    private airportsDataService: AirportsDataService
  ) { }

  public getAirports() {
    this.dispatchLoading();
    this.airportsDataService
      .getAirports()
      .subscribe(
        airports => this.dispatch(AirportsActions.getAirportsSuccess({ airports })),
        error => this.dispatch(AirportsActions.getAirportsError(error))
      );
  }


  private dispatch = (action: Action) => this.store.dispatch(action);
  private dispatchLoading = () =>
    this.dispatch(AirportsActions.setAirportLoading({ loading: true }))
}
