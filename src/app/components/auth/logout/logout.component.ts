import { Component, OnInit } from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthState } from '../../store/auth/auth.state';
import { Store } from '@ngrx/store';
import { logout } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [NzCardComponent, NzButtonComponent],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent implements OnInit {
  logoutDenyUrl = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AuthState>
  ) {}

  logout() {
    localStorage.setItem('TOKEN', '');
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }

  denyLogout() {
    this.router.navigate([this.logoutDenyUrl]);
  }

  ngOnInit(): void {
    this.logoutDenyUrl = this.route.snapshot.queryParams['logoutDenyUrl'];
  }
}
