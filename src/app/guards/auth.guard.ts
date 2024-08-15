import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthTokenStatus } from '../interfaces/auth';
import { AuthService } from '../service/auth.service';
import { JwtService } from '../service/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private jwtService: JwtService) {}

  canActivate(): boolean {
    if (this.jwtService.checkAuth()) {
      return true;
    } else {
      // Token does not exist, redirect to login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
