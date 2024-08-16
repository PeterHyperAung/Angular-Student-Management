import { Component } from '@angular/core';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceComponent } from 'ng-zorro-antd/space';
import { NavigationStart, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NzPageHeaderModule, NzSpaceComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  logoutDenyUrl = '/';

  constructor(private router: Router) {
    router.events.subscribe({
      next: (val) => {
        if (val instanceof NavigationStart) {
          if (val.url === '/logout') return;
          this.logoutDenyUrl = val.url;
        }
      },
    });
  }
}
