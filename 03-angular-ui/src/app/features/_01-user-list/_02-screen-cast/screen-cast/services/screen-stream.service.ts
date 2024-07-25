import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScreenStreamService {
  public ip?: string | undefined;

  constructor(private http: HttpClient) {}

  private fetchScreenImage(): Observable<Blob> {
    const apiUrl = `http://${this.ip}:${environment.appPort}/stream`;

    return this.http.get(apiUrl, { responseType: 'blob' }).pipe(
      catchError((error) => {
        console.error('Error fetching screen image:', error);
        throw error;
      })
    );
  }

  setIP(ip: string) {
    this.ip = ip;
  }

  streamScreenImage(): Observable<Blob> {
    return interval(200).pipe(switchMap(() => this.fetchScreenImage()));
  }
}
