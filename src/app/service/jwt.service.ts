import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private token: string = '';
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  checkAuth(): boolean {
    return (
      !!this.getToken() &&
      !!this.getLocalStroageToken() &&
      this.getToken() === this.getLocalStroageToken() &&
      !this.isLocalStorageTokenExpire()
    );
  }

  getToken() {
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
  }

  setTokenLocalStorage(token: string) {
    localStorage.setItem('TOKEN', token);
  }

  removeToken() {
    localStorage.removeItem('TOKEN');
    this.token = '';
  }

  checkAndSetToken() {
    const token = this.getLocalStroageToken();
    if (!token || this.isLocalStorageTokenExpire()) return;

    return this.http.post(`${this.apiUrl}/auth/validate-token`, {
      token,
    });
  }

  getLocalStroageToken() {
    return localStorage.getItem('TOKEN') ?? '';
  }

  checkToken() {
    const token = localStorage.getItem('TOKEN');
    return this.token === token;
  }

  parseJwt() {
    try {
      const parts = this.getLocalStroageToken()?.split('.') ?? '';

      if (parts.length != 3) {
        return null;
      }

      const payload = parts[1];
      const decodedPayload = JSON.parse(
        atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
      );
      return decodedPayload;
    } catch (error) {
      console.log('Error parsing JWT', error);
      return null;
    }
  }

  isLocalStorageTokenExpire() {
    const decoded = this.parseJwt();
    if (!decoded) {
      return false;
    }

    const now = new Date();
    const nowInSeconds = Math.floor(now.getTime() / 1000);

    return nowInSeconds > decoded.exp;
  }
}
