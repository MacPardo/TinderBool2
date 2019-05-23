import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'POST, GET, PUT',
                            'Accept': 'application/json'}),
};

/* Nome qualquer, pois não temos isso ainda :) */
const apiUrl = "http://127.0.0.1:3000";

@Injectable({
  providedIn: 'root'
})

export class RestApiService {

  constructor(private http: HttpClient) { }

  private async handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Um erro ocorreu:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`API retornou o código ${error.status}: ${error.error}`);
    }

    // return an observable with a user-facing error message
    return 0;
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getSports(): Observable<any> {
    const url = `${apiUrl}/sport`;
    let result = this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
    return result
  }

  getSportById(id: string): Observable<any> {
    const url = `${apiUrl}/sport/${id}`;
    let result = this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
    return result
  }

  postSportsman(sportsman: Object): Observable<any> {
    const url = `${apiUrl}/sportsman`;
    let result = this.http.post(url, sportsman, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
    return result
  }

  login(email: string, password: string): Observable<any> {
    const url = `${apiUrl}/sportsman?email=${email}&password=${password}`;
    var body = {
      email:email,
      password:password
    };
    let result = this.http.post(url, body, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
    return result
  }

}
