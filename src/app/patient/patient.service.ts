import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Patient } from './patient';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiURL = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  private patientUrl = '/patients/';

  getAll(): Observable<any> {
    return this.httpClient
      .get(this.apiURL + this.patientUrl)

      .pipe(catchError(this.errorHandler));
  }

  getAllPaginated(
    page: number,
    size: number,
    patient: Patient
  ): Observable<any> {
    const options = patient
      ? {
          params: new HttpParams()
            .set('id', patient.id)
            .set('firstname', patient.firstname)
            .set('lastname', patient.lastname),
        }
      : {};
    return this.httpClient
      .get(
        this.apiURL + this.patientUrl + 'page/' + page + '/size/' + size,
        options
      )

      .pipe(catchError(this.errorHandler));
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  create(patient: Patient): Observable<any> {
    return this.httpClient
      .post(
        this.apiURL + this.patientUrl,
        JSON.stringify(patient),
        this.httpOptions
      )

      .pipe(catchError(this.errorHandler));
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  find(id: number): Observable<any> {
    return this.httpClient
      .get(this.apiURL + this.patientUrl + id)

      .pipe(catchError(this.errorHandler));
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  update(patient: Patient): Observable<any> {
    return this.httpClient
      .put(
        this.apiURL + this.patientUrl,
        JSON.stringify(patient),
        this.httpOptions
      )

      .pipe(catchError(this.errorHandler));
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  delete(id: number) {
    return this.httpClient
      .delete(this.apiURL + this.patientUrl + id, this.httpOptions)

      .pipe(catchError(this.errorHandler));
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }
}
