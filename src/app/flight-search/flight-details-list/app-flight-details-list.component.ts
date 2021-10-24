import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FlightDetails } from 'src/app/core/models';
import { FlightDetailsListViewModel } from 'src/app/core/constants';

@Component({
  selector: 'app-flight-details-list',
  templateUrl: './app-flight-details-list.component.html',
  styleUrls: ['./app-flight-details-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppFlightDetailsListComponent {
  @Input() flightDetailsList: FlightDetails[];
  @Input() title: string;
  @Input() departureCode: string;
  public airlineName = FlightDetailsListViewModel.airlineName;
  public outboundFlightsDuration = FlightDetailsListViewModel.outboundFlightsDuration;
  public inboundFlightsDuration = FlightDetailsListViewModel.inboundFlightsDuration;
  public totalAmount = FlightDetailsListViewModel.totalAmount;

  public byId(flightDetails: FlightDetails) {
    return flightDetails.id;
  }

}
