// src/app/services/monitor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MonitorService {
  monitors: any[] = [];
  lastIP = '';

  constructor(private http: HttpClient) {}

  setMonitors(ip: string): void {
    this.getMonitors(ip).subscribe((data) => {
      this.monitors = data.monitors;
    });
  }

  private getMonitors(ip: string): Observable<any> {
    const apiUrl = `http://${ip}:${environment.appPort}/monitors`;
    return this.http.get(`${apiUrl}`).pipe(catchError(this.handleError));
  }

  startStream(monitorId: string): Observable<any> {
    const apiUrl = `http://${this.lastIP}:${environment.appPort}/stream/${monitorId}`;
    return this.http.get(`${apiUrl}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
    } else {
      // Server-side error
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
