import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'plopdown-site-footer',
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.scss'],
})
export class SiteFooterComponent implements OnInit {
  public currentDate: Date;

  ngOnInit(): void {
    this.currentDate = new Date();
  }
}
