import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { TextInputModel, FlightRequest, Airport } from 'src/app/core/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FlightSearchViewModel } from 'src/app/core/constants';
import { UtilitiesService, NavigationService } from 'src/app/core/services';
import { FlightDetailsDispatchers } from 'src/app/store/services/flight-details.dispatchers';
import { FlightDetailsSelectors } from 'src/app/store/selectors/flight-details.selector';
import { takeWhile } from 'rxjs/operators';
import { AirportsDispatchers } from 'src/app/store/services';
import { AirportsSelectors } from 'src/app/store/selectors/airports.selector';

@Component({
  selector: 'app-flight-search',
  templateUrl: './app-flight-search.component.html',
  styleUrls: ['./app-flight-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppFlightSearchComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    private util: UtilitiesService,
    private navigationService: NavigationService,
    private FlightDispatchers: FlightDetailsDispatchers,
    private flightSelector: FlightDetailsSelectors,
    private airportsDispatchers: AirportsDispatchers,
    private airportsSelectors: AirportsSelectors) { }

  public searchForm: FormGroup;
  public title = FlightSearchViewModel.title;
  public txtInputDepartAirport: TextInputModel = FlightSearchViewModel.txtInputDepartAirport;
  public txtInputArrivalAirport: TextInputModel = FlightSearchViewModel.txtInputArrivalAirport;
  public txtInputDepartDate: TextInputModel = FlightSearchViewModel.txtInputDepartDate;
  public txtInputReturnDate: TextInputModel = FlightSearchViewModel.txtInputReturnDate;
  public minReturnDate = new Date();
  public loading$: Observable<boolean>;
  public emptyResultMessage = FlightSearchViewModel.emptyResultMessage;
  public errorMessage = FlightSearchViewModel.errorMessage;
  public noResult = false;
  public error = false;
  public buttonSearch = FlightSearchViewModel.buttonSearch;
  public buttonReset = FlightSearchViewModel.buttonReset;

  private flightRequest: FlightRequest;
  private componentActive: boolean = true;
  private departDate: Date;
  private airports: Airport[] = [];
  private departCode: string = '';

  ngOnInit(): void {
    this.getAirports();
    this.setForm();
    this.setEvents();
  }
  ngOnDestroy(): void {
    this.componentActive = false;
  }

  private getAirports(): void {
    this.airportsDispatchers.getAirports();
    this.airportsSelectors.loaded$
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(loaded => {
        if (loaded) {
          this.airportsSelectors.allAirports$
            .pipe(takeWhile(() => this.componentActive))
            .subscribe(airports => {
              this.airports = airports;
            });
        }
      });

    this.airportsSelectors.hasError$.subscribe(error => {
      this.error = error;
    });
  }

  private setEvents(): void {
    const curDate = new Date();
    curDate.setDate(curDate.getDate() + 2);
    this.minReturnDate = curDate;

    this.searchForm.controls.departureCode.valueChanges.subscribe(code => {
      if (code && code.length === this.txtInputDepartAirport.maxLength) {
        const depCode = this.airports.find(a => a.code === code.toUpperCase());
        if (depCode === undefined) {
          this.searchForm.controls.departureCode.setErrors({ notFound: true });
        }
        this.departCode = code.toUpperCase();
      }
    });

    this.searchForm.controls.arrivalCode.valueChanges.subscribe(code => {
      if (code && code.length === this.txtInputArrivalAirport.maxLength) {
        const arrCode = this.airports.find(a => a.code === code.toUpperCase());
        if (arrCode === undefined) {
          this.searchForm.controls.arrivalCode.setErrors({ notFound: true });
        } else {
          if (this.departCode && code.toUpperCase() === this.departCode) {
            this.searchForm.controls.arrivalCode.setErrors({ sameDepartCode: true });
          }
        }
      }
    });

    this.searchForm.controls.departureDate.valueChanges.subscribe(date => {
      this.departDate = moment(date, 'YYYY-MM-DD').toDate();
      this.minReturnDate.setDate(this.departDate.getDate() + 1);
    });

    this.searchForm.controls.returnDate.valueChanges.subscribe(date => {
      const returnDate = moment(date, 'YYYY-MM-DD').toDate();
      if (returnDate <= this.departDate) {
        this.searchForm.controls.returnDate.setErrors({ returnDate: true });
      }
    });

    this.searchForm.valueChanges.subscribe(() => {
      this.noResult = false;
    });

    this.loading$ = this.flightSelector.loading$;
  }

  private setForm(): void {
    const departureAirportValidators = this.util.createValidators(this.txtInputDepartAirport);
    const arrivalAirportValidators = this.util.createValidators(this.txtInputArrivalAirport);
    const departureDateValidators = this.util.createValidators(this.txtInputDepartDate);
    const returnDateValidators = this.util.createValidators(this.txtInputReturnDate);

    this.searchForm = this.fb.group({
      departureCode: this.util.createFormControl(departureAirportValidators),
      arrivalCode: this.util.createFormControl(arrivalAirportValidators),
      departureDate: this.util.createFormControl(departureDateValidators),
      returnDate: this.util.createFormControl(returnDateValidators),
    });
  }

  public search(event: Event): void {
    event.stopPropagation();
    if (this.searchForm.valid) {
      this.flightRequest = this.searchForm.value;
      const departDateNumber = moment(this.flightRequest.departureDate, 'YYYY-MM-DD').toDate().getTime().toString();
      const returnDateNumber = moment(this.flightRequest.returnDate, 'YYYY-MM-DD').toDate().getTime().toString();
      const id = this.flightRequest.departureCode + this.flightRequest.arrivalCode + departDateNumber + returnDateNumber;
      this.flightRequest.id = id;
      this.flightRequest.departureCode = this.flightRequest.departureCode.toUpperCase();
      this.flightRequest.arrivalCode = this.flightRequest.arrivalCode.toUpperCase();
      this.FlightDispatchers.getFlightDetails(this.flightRequest);
      this.loading$
        .pipe(takeWhile(() => this.componentActive))
        .subscribe(loading => {
          if (!loading) {
            this.flightSelector.hasFlightDetails$(id).subscribe(result => {
              if (result) {
                this.navigationService.navigateTo('/flight-results/' + id, null);
              } else {
                this.noResult = true;
              }

            });
          }
        });
      this.flightSelector.hasError$.subscribe(error => {
        this.error = error;
      });
    }

  }

  public reset(event: Event): void {
    this.searchForm.reset();
  }
}
