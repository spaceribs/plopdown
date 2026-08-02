import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'plopdown-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class HomeComponent {}
