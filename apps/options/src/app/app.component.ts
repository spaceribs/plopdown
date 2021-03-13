import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'plopdown-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'options';
  showMenu = false;
  currentDate = new Date();

  constructor(private router: Router) {}

  isRouteActive(routePath: string[]) {
    const route = this.router.createUrlTree(routePath);
    return this.router.isActive(route, false);
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
