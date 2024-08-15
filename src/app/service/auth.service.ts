import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { AuthRequestBody } from '../interfaces/auth';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private token: string = '';
  constructor(
    private http: HttpClient,
    private router: Router,
    jwtService: JwtService
  ) {}

  login(body: AuthRequestBody) {
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  validateAuth() {}

  signup(body: AuthRequestBody) {
    return this.http.post(`${this.apiUrl}/register`, body);
  }

  logout() {
    localStorage.removeItem('TOKEN');
    this.router.navigate(['/login']);
  }
}
