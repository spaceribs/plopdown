import { Component, Output, EventEmitter, Input } from '@angular/core';
import { mdiFileUpload } from '@mdi/js';
import { FullAttachments } from '../../../models/full-attachments.model';

@Component({
  selector: 'plopdown-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
})
export class FileManagerComponent {
  public mdiFileUpload = mdiFileUpload;

  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() save: EventEmitter<FullAttachments> = new EventEmitter();
  @Input() attachments?: FullAttachments;

  onCancel() {
    this.cancel.emit();
  }

  onSave() {
    if (this.attachments != null) {
      this.save.emit(this.attachments);
    }
  }

  formatBytes(data: any | Blob, decimals = 2) {
    if (data.size == null || data.size === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(data['size']) / Math.log(k));

    return (
      parseFloat((data.size / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    );
  }

  onReplaceFile(fileName: string, event: Event) {
    const files = (event.target as HTMLInputElement).files;

    if (files == null) {
      return;
    }

    const file = files[0];

    this.attachments = {
      ...this.attachments,
      [fileName]: {
        content_type: file.type,
        data: file,
      },
    };
  }

  getFile(files?: FileList | null): File | null {
    if (files == null || files[0] == null) {
      return null;
    }
    return files[0];
  }

  getFileName(files?: FileList | null) {
    if (files == null || files[0] == null) {
      return null;
    }
    return files[0].name;
  }
}
