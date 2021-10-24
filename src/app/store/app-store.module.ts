import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { effects } from './effects';
import { reducers } from './reducers';
import { FlightDetailsDispatchers, AirportsDispatchers } from './services';
import { FlightDetailsDataService } from './services/flight-details-data.services';
import { FlightDetailsSelectors } from './selectors/flight-details.selector';
import { AirportsDataService } from './services/airports-data.services';
import { AirportsSelectors } from './selectors/airports.selector';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('entityCache', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [
    FlightDetailsDataService,
    FlightDetailsDispatchers,
    FlightDetailsSelectors,
    AirportsDataService,
    AirportsDispatchers,
    AirportsSelectors],
  exports: [StoreModule, EffectsModule]
})
export class AppStoreModule { }
