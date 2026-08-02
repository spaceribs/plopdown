import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'plopdown-site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class SiteFooterComponent {
  public currentDate: Date = new Date();
}
