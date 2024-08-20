import { Component, OnInit } from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { RouterModule } from '@angular/router';
import { JwtService } from '../../service/jwt.service';
import { IUser } from '../../interfaces/user';
import { User } from '../../models/user.model';
import { combineLatest, map, Observable } from 'rxjs';
import { AuthState } from '../store/auth/auth.state';
import { Store } from '@ngrx/store';
import { selectRole, selectUsername } from '../store/auth/auth.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NzCardComponent, RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  loading = true;
  user$!: Observable<{
    username: string | null;
    role: 'USER' | 'ADMIN' | null;
  }>;
  constructor(
    private jwtService: JwtService,
    private store: Store<{
      username: string | null;
      role: 'USER' | 'ADMIN' | null;
    }>
  ) {}

  ngOnInit(): void {
    this.user$ = combineLatest([
      this.store.select(selectUsername),
      this.store.select(selectRole),
    ]).pipe(map(([username, role]) => ({ username, role })));
  }
}
