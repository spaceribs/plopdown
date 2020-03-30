import { Component } from '@angular/core';

@Component({
  selector: 'plopdown-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'options';

  requestPermissions(event: Event) {
    event.preventDefault();
    browser.permissions
      .request({
        origins: ['https://www.youtube.com/embed/7MNS2dPfm0g']
      })
      .then(allowed => {
        console.log(allowed);
      })
      .catch(err => console.log(err));
  }
}
