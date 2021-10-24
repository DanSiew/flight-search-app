import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataServiceError, Airport } from 'src/app/core/models';

@Injectable()
export class AirportsDataService {
  constructor(private http: HttpClient) { }

  public getAirports(): Observable<Airport[]> {
    const url = '/api/airports';
    return this.http.get<Airport[]>(url).pipe(
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
