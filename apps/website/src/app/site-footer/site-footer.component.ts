import { Component } from '@angular/core';

@Component({
  selector: 'plopdown-site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.scss'],
})
export class SiteFooterComponent {
  public currentDate: Date = new Date();
}
