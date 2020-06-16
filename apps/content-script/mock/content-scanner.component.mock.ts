import { ContentScannerComponent } from './../src/app/content-scanner/content-scanner.component';
import { Component } from '@angular/core';

@Component({
  selector: 'plopdown-content-scanner',
  template: 'mock-content-scanner',
})
export class MockContentScannerComponent
  implements Partial<ContentScannerComponent> {}
