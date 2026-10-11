import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  private apiBaseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  public getTrips(): Observable<Trip[]> {
    const url = `${this.apiBaseUrl}/trips`;
    return this.http.get<Trip[]>(url);
  }

  public addTrip(trip: Trip): Observable<Trip> {
    const url = `${this.apiBaseUrl}/trips`;
    return this.http.post<Trip>(url, trip);
  }

  public getTrip(tripCode: string): Observable<Trip> {
    const url = `${this.apiBaseUrl}/trips/${encodeURIComponent(tripCode)}`;
    return this.http.get<Trip>(url);
  }

  public updateTrip(tripCode: string, trip: Trip): Observable<Trip> {
    const url = `${this.apiBaseUrl}/trips/${encodeURIComponent(tripCode)}`;
    return this.http.put<Trip>(url, trip);
  }

}