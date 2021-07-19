import { Remote, RemoteValidatorService } from '@plopdown/remotes';
import {
  mdiAlertCircleOutline,
  mdiCheckboxMarkedCircleOutline,
  mdiSync,
} from '@mdi/js';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'plopdown-remote-editor',
  templateUrl: './remote-editor.component.html',
  styleUrls: ['./remote-editor.component.scss'],
})
export class RemoteEditorComponent {
  public mdiAlertCircleOutline = mdiAlertCircleOutline;
  public mdiCheckboxMarkedCircleOutline = mdiCheckboxMarkedCircleOutline;
  public mdiSync = mdiSync;

  public remoteForm: FormGroup;
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() save: EventEmitter<Remote> = new EventEmitter();

  @Input() set remote(remote: Remote | null) {
    if (remote != null) {
      this.remoteForm.patchValue(remote);
    } else {
      this.remoteForm.reset();
    }
  }

  constructor(fb: FormBuilder, remoteValidator: RemoteValidatorService) {
    this.remoteForm = fb.group({
      title: [null, Validators.required],
      url: [null, [Validators.required], [remoteValidator.validate]],
      sync: [null, Validators.required],
      username: [null],
      password: [null],
      _id: [null],
      _rev: [null],
    });
  }

  onCancel() {
    this.cancel.emit();
  }

  onSave(event: Event) {
    event.preventDefault();

    if (this.remoteForm.invalid) {
      return;
    }

    this.save.emit(this.remoteForm.value);
  }
}
