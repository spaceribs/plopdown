import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'plopdown-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AppComponent {
  title = 'website';
}
