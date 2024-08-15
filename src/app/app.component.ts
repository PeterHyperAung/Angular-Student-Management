import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentsListComponent } from './students-list/students-list.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './service/auth.service';
import { JwtService } from './service/jwt.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StudentsListComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'stuents-management';

  constructor(private jwtService: JwtService) {}

  get isAuthenticated(): boolean {
    return this.jwtService.checkAuth();
  }
}
