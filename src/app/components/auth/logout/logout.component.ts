import { Component, OnInit } from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [NzCardComponent, NzButtonComponent],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent implements OnInit {
  logoutDenyUrl = '';
  constructor(private router: Router, private route: ActivatedRoute) {}

  logout() {
    localStorage.setItem('TOKEN', '');
    this.router.navigate(['/login']);
  }

  denyLogout() {
    this.router.navigate([this.logoutDenyUrl]);
  }

  ngOnInit(): void {
    this.logoutDenyUrl = this.route.snapshot.queryParams['logoutDenyUrl'];
  }
}
