import { Component, Output, EventEmitter, Input } from '@angular/core';
import { mdiFileUpload } from '@mdi/js';

@Component({
  selector: 'plopdown-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
})
export class FileManagerComponent {
  public mdiFileUpload = mdiFileUpload;

  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() save: EventEmitter<PouchDB.Core.Attachments> = new EventEmitter();

  @Input() attachments: PouchDB.Core.Attachments;

  constructor() {}

  onCancel() {
    this.cancel.emit();
  }

  onSave() {
    this.save.emit(this.attachments);
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  onReplaceFile(fileName: string, event: Event) {
    const file = (event.target as HTMLInputElement).files[0];

    this.attachments = {
      ...this.attachments,
      [fileName]: {
        content_type: file.type,
        data: file,
      },
    };
  }
}
