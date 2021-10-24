import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppFlightSearchComponent } from './flight-search/flight-search/app-flight-search.component';
import { AppFlightResultsComponent } from './flight-search/flight-results/app-flight-results.component';


export const routes: Routes = [
  { path: '', pathMatch: 'full', component: AppFlightSearchComponent },
  { path: 'flight-results/:id', component: AppFlightResultsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
