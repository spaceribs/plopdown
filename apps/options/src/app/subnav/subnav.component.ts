import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'plopdown-subnav',
  templateUrl: './subnav.component.html',
  styleUrls: ['./subnav.component.scss']
})
export class SubnavComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  isRouteActive(routePath: string[]) {
    const route = this.router.createUrlTree(routePath);
    return this.router.isActive(route, false);
  }
}
