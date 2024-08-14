import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { AuthRequestBody } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private token: string = '';
  constructor(private http: HttpClient, private router: Router) {}

  login(body: AuthRequestBody) {
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  public setToken(token: string) {
    this.token = token;
    localStorage.setItem('TOKEN', token);
  }

  getToken() {
    return localStorage.getItem('TOKEN');
  }

  checkToken() {
    const token = localStorage.getItem('TOKEN');
    return this.token === token;
  }

  signup(body: AuthRequestBody) {
    return this.http.post(`${this.apiUrl}/signup`, body);
  }

  logout() {
    localStorage.removeItem('TOKEN');
    this.router.navigate(['/login']);
  }
}
