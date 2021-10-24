import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { FlightDetailsDataService } from './flight-details-data.services';
import { mockFlightResult } from '../mockData/mock-flight-details';
import { FlightResult, FlightRequest } from 'src/app/core/models';
import * as qs from 'qs';

describe('FlightDetailsDataService', () => {
  let injector: TestBed;
  let service: FlightDetailsDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FlightDetailsDataService]
    });
    injector = getTestBed();
    service = injector.get(FlightDetailsDataService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getFlightDetails', () => {
    it('should return an Observable<FlightDetails>', async () => {
      const flightResult = mockFlightResult;
      const flightRequest = new FlightRequest();

      service.getFlightDetails(flightRequest).subscribe(result => {
        expect(result).toEqual(flightResult);
      });
      const req = httpMock.expectOne(`/api/flightSearch?` + qs.stringify(flightRequest));
      expect(req.request.method).toBe('GET');
      req.flush(flightResult);
    });
  });
});
