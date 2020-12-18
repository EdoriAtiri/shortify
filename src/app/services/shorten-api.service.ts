import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { shortcode } from '../../shared/shortcode';

@Injectable({
  providedIn: 'root',
})
export class ShortenAPIService {
  constructor(private http: HttpClient) {}

  public handleError(error: HttpErrorResponse | any) {
    let errMSg: string;

    if (error.error instanceof ErrorEvent) {
      errMSg = error.error.message;
    } else {
      errMSg = `${error.status} - ${error.statusText || ''}
      ${error.error}`;
    }

    return throwError(errMSg);
  }

  getLink(link: string): Observable<shortcode> {
    return this.http
      .get<shortcode>(`https://api.shrtco.de/v2/shorten?url=${link}`)
      .pipe(catchError(this.handleError));
  }
}
