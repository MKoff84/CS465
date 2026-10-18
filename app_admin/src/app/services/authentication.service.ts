import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://localhost:3000/api/login';
  private tokenKey = 'travlr_admin_token';

  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, {
      email,
      password
    }).pipe(
      tap(response => {
        sessionStorage.setItem(this.tokenKey, response.token);
      })
    );
  }

  public getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return typeof payload.exp === 'number' &&
        payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  public logout(): void {
    sessionStorage.removeItem(this.tokenKey);
  }
}