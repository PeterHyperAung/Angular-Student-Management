import { Component } from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [NzCardComponent, NzButtonComponent],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.setItem('TOKEN', '');
    this.router.navigate(['/login']);
  }

  routeToHome() {
    this.router.navigate(['/']);
  }
}
