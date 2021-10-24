import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { AppState } from '../reducers';
import * as FlightDetailsActions from '../actions';
import { FlightRequest } from 'src/app/core/models';
import { FlightDetailsDataService } from './flight-details-data.services';


@Injectable()
export class FlightDetailsDispatchers {

  constructor(
    private store: Store<AppState>,
    private flightDetailsDataService: FlightDetailsDataService
  ) { }

  public getFlightDetails(flightRequest: FlightRequest) {
    this.dispatchLoading();
    this.flightDetailsDataService
      .getFlightDetails(flightRequest)
      .subscribe(
        flightResult => this.dispatch(FlightDetailsActions.getFlightDetailsSuccess({ flightResult })),
        error => this.dispatch(FlightDetailsActions.getFlightDetailsError(error))
      );
  }


  private dispatch = (action: Action) => this.store.dispatch(action);
  private dispatchLoading = () =>
    this.dispatch(FlightDetailsActions.setFlightDetailsLoading({ loading: true }))
}
