import { Component } from '@angular/core';
import { BrowserActionPubService } from '@plopdown/messages';

@Component({
  selector: 'plopdown-browser-action',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private baPub: BrowserActionPubService) {}
}
