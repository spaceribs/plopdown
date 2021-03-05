import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'plopdown-subnav',
  templateUrl: './subnav.component.html',
  styleUrls: ['./subnav.component.scss'],
})
export class SubnavComponent {
  constructor(private router: Router) {}

  isRouteActive(routePath: string[]) {
    const route = this.router.createUrlTree(routePath);
    return this.router.isActive(route, false);
  }
}
