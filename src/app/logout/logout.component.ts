import { Component } from '@angular/core';
import { NzCardComponent } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [NzCardComponent],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {}
