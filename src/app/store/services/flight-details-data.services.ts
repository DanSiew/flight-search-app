import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataServiceError, FlightRequest, FlightResult } from 'src/app/core/models';
import * as qs from 'qs';

@Injectable()
export class FlightDetailsDataService {
  constructor(private http: HttpClient) { }

  public getFlightDetails(flightRequest: FlightRequest): Observable<FlightResult> {
    const url = '/api/flightSearch?' + qs.stringify(flightRequest);
    return this.http.get<FlightResult>(url).pipe(
      catchError(this.handleError())
    );
  }

  private handleError<T>(requestData?: T) {
    return (res: HttpErrorResponse) => {
      const error = new DataServiceError(res.error, requestData);
      console.error(error);
      return throwError(error);
    };
  }
}
