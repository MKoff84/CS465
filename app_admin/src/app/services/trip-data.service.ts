import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  private apiBaseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();

    return new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`
    });
  }

  public getTrips(): Observable<Trip[]> {
    const url = `${this.apiBaseUrl}/trips`;
    return this.http.get<Trip[]>(url);
  }

  public getTrip(tripCode: string): Observable<Trip> {
    const url = `${this.apiBaseUrl}/trips/${encodeURIComponent(tripCode)}`;
    return this.http.get<Trip>(url);
  }

  public addTrip(trip: Trip): Observable<Trip> {
    const url = `${this.apiBaseUrl}/trips`;

    return this.http.post<Trip>(url, trip, {
      headers: this.getAuthHeaders()
    });
  }

  public updateTrip(tripCode: string, trip: Trip): Observable<Trip> {
    const url = `${this.apiBaseUrl}/trips/${encodeURIComponent(tripCode)}`;

    return this.http.put<Trip>(url, trip, {
      headers: this.getAuthHeaders()
    });
  }

  public deleteTrip(tripCode: string): Observable<void> {
    const url = `${this.apiBaseUrl}/trips/${encodeURIComponent(tripCode)}`;

    return this.http.delete<void>(url, {
      headers: this.getAuthHeaders()
    });
  }
}