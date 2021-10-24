import { async } from '@angular/core/testing';
import { Store, MemoizedSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import {
  FlightDetailsSelectors, getFlightDetails, getFlightDetailsState, getFlightDetailsLoading
} from './flight-details.selector';
import { mockFlightResult } from '../mockData/mock-flight-details';
import { FlightResult } from 'src/app/core/models';
import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as fromFlightDetails from '../../store/reducers/flight-details.reducer';

describe('FlightDetailsSelectors', () => {

  let mockStore: MockStore<AppState>;
  const initialState = fromFlightDetails.initialState;
  let mockflightDetailsSelectors: MemoizedSelector<fromFlightDetails.FlightDetailsState, FlightResult>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [provideMockStore({ initialState })
      ]
    });

  }));

  it('should return call the getFlightDetails', () => {
    const id = 'MELPEK15746868000001574946000000';
    mockStore = TestBed.get(Store);
    const flightResult = mockFlightResult;
    const flightDetailsSelectors = new FlightDetailsSelectors(mockStore);
    mockflightDetailsSelectors = mockStore.overrideSelector(getFlightDetails(id), flightResult);
    flightDetailsSelectors.getFlightDetails$(id).subscribe(result => {
      expect(result).toEqual(flightResult);
    });
  });

  it('should return call the getFlightDetailsState', () => {
    const store = jasmine.createSpyObj<Store<AppState>>('store', ['select']);
    const flightDetailsSelectors = new FlightDetailsSelectors(store);
    const state = flightDetailsSelectors.flightDetailsState$;
    expect(store.select).toHaveBeenCalledWith(getFlightDetailsState);
  });

  it('should return call the getFlightDetailsState', () => {
    const store = jasmine.createSpyObj<Store<AppState>>('store', ['select']);
    const flightDetailsSelectors = new FlightDetailsSelectors(store);
    const state = flightDetailsSelectors.loading$;
    expect(store.select).toHaveBeenCalledWith(getFlightDetailsLoading);
  });


});
