import { Component, OnInit } from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { RouterModule } from '@angular/router';
import { JwtService } from '../../service/jwt.service';
import { IUser } from '../../interfaces/user';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NzCardComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  loading = true;
  user: User | null = null;
  constructor(private jwtService: JwtService) {}

  ngOnInit(): void {
    const decoded = this.jwtService.parseJwt();
    this.user = new User(decoded.id, decoded.username, decoded.role);
    this.loading = false;
  }
}
