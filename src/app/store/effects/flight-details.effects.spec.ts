import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { FlightDetailsEffects } from './flight-details.effects';
import { FlightDetailsDataService } from '../services/flight-details-data.services';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import * as flightActions from 'src/app/store/actions/flight-details.actions';
import { mockFlightResult } from '../mockData/mock-flight-details';

describe('UserEffects', () => {
  let actions: Observable<any>;
  let effects: FlightDetailsEffects;
  let flightDetailsDataService: jasmine.SpyObj<FlightDetailsDataService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FlightDetailsEffects,
        provideMockActions(() => actions),
        {
          provide: FlightDetailsDataService,
          useValue: {
            getFlightDetails: jasmine.createSpy()
          }
        }
      ]
    });

    actions = TestBed.get(Actions);
    effects = TestBed.get(FlightDetailsEffects);
    flightDetailsDataService = TestBed.get(FlightDetailsDataService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('getFlightDetails$', () => {

    it('should return a stream with flight results loaded action', () => {
      const flightResult = mockFlightResult;
      const action = flightActions.getFlightDetails;
      const outcome = flightActions.getFlightDetailsSuccess({ flightResult });
      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: flightResult });
      flightDetailsDataService.getFlightDetails.and.returnValue(response);
      const expected = cold('--b', { b: outcome });
      expect(effects.getFlightDetails$).toBeObservable(expected);

    });
  });
});
