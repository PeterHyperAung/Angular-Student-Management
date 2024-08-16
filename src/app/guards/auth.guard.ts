import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
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
