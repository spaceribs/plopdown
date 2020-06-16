import { Component } from '@angular/core';
import { FileImporterComponent } from '../src/app/tracks/file-importer/file-importer.component';

@Component({
  selector: 'plopdown-file-importer',
  template: 'mock-plopdown-file-importer',
})
export class MockFileImporterComponent
  implements Partial<FileImporterComponent> {}
