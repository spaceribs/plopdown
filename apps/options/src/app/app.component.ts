import { ExtStorageService, ExtStorageAreaName } from '@plopdown/ext-storage';
import { Component } from '@angular/core';

@Component({
  selector: 'plopdown-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'options';

  constructor(extStorage: ExtStorageService) {
    const blob = {
      test: new Blob([JSON.stringify({ test: true }, null, 2)], {
        type: 'application/json'
      })
    };

    extStorage.set(ExtStorageAreaName.Local, blob);
  }

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

  fileSelected(event) {
    console.log(event);
  }
}
