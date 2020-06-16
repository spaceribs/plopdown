import { Component, Input } from '@angular/core';
import { FileManagerComponent } from '../src/app/tracks/file-manager/file-manager/file-manager.component';

@Component({
  selector: 'plopdown-file-manager',
  template: 'mock-plopdown-file-manager',
})
export class MockFileManagerComponent implements Partial<FileManagerComponent> {
  @Input() attachments: PouchDB.Core.Attachments;
}
