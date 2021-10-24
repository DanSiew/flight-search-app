import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { AppFlightSearchComponent } from './flight-search/app-flight-search.component';
import { AppFlightResultsComponent } from './flight-results/app-flight-results.component';
import { AppFlightDetailsListComponent } from './flight-details-list/app-flight-details-list.component';

@NgModule({
  imports: [CommonModule, SharedModule, MaterialModule],
  exports: [
    AppFlightSearchComponent,
    AppFlightResultsComponent,
    AppFlightDetailsListComponent],
  declarations: [
    AppFlightSearchComponent,
    AppFlightResultsComponent,
    AppFlightDetailsListComponent],
  providers: []
})
export class FlightSearchModule { }
