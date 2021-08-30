import { Router } from '@angular/router';
import { AfterContentInit, Component } from '@angular/core';

@Component({
  selector: 'plopdown-root',
  template: 'plopdown-devtool',
})
export class AppComponent implements AfterContentInit {
  constructor(private router: Router) {
    console.log('Initialized Devtools');
  }

  ngAfterContentInit(): void {
    this.router.navigate(['panel-manager']);
  }
}
