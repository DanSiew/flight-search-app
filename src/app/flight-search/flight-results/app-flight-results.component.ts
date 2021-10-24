import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { FlightResult } from "src/app/core/models";
import { FlightDetailsSelectors } from "src/app/store/selectors/flight-details.selector";
import { takeWhile } from "rxjs/operators";
import { NavigationService } from "src/app/core/services";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { FlightResultViewModel } from "src/app/core/constants";

@Component({
  selector: "app-flight-results",
  templateUrl: "./app-flight-results.component.html",
  styleUrls: ["./app-flight-results.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppFlightResultsComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private selector: FlightDetailsSelectors
  ) {}

  public flightResult: FlightResult = new FlightResult();
  public loaded$: Observable<boolean>;
  private componentActive: boolean = true;
  public buttonSearch = FlightResultViewModel.buttonSearch;

  ngOnInit(): void {
    this.loaded$ = this.selector.loaded$;
    this.route.paramMap
      .pipe(takeWhile(() => this.componentActive))
      .subscribe((params: ParamMap) => {
        const id = params.get("id");
        this.selector
          .getFlightDetails$(id)
          .pipe(takeWhile(() => this.componentActive))
          .subscribe((data: any) => {
            if (data !== undefined) {
              this.flightResult = data;
            } else {
              this.navigationService.navigateTo("/", null);
            }
          });
      });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  public back(event: Event) {
    event.stopPropagation();
    this.navigationService.navigateTo("/", null);
  }
}
