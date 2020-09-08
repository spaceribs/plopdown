import { VideoRefsService } from '@plopdown/video-refs';
import { Subscription } from 'rxjs';
import { PermissionsRequestService } from '@plopdown/browser-ref';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ErrorHandler,
  OnDestroy,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { Permission } from '@plopdown/permissions';

@Component({
  selector: 'plopdown-permission-editor',
  templateUrl: './permission-editor.component.html',
  styleUrls: ['./permission-editor.component.scss'],
})
export class PermissionEditorComponent implements OnDestroy {
  public previousPerms: Permission;
  public permissionForm: FormGroup;

  private subs: Subscription = new Subscription();

  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() save: EventEmitter<Permission> = new EventEmitter();
  videoRefs$: any;

  @Input() set permission(permission: Permission | null) {
    if (permission != null) {
      this.previousPerms = permission;
      this.permissionForm.setValue(permission);
    } else {
      this.permissionForm.reset();
    }
  }

  constructor(
    fb: FormBuilder,
    private permsService: PermissionsRequestService,
    private errorHandler: ErrorHandler,
    videoRefsService: VideoRefsService
  ) {
    const urlValidator: ValidatorFn = (control: AbstractControl) => {
      const validUrl = this.convertUrl(control.value);
      return validUrl ? null : { invalidUrl: true };
    };

    this.permissionForm = fb.group({
      _id: [null],
      _rev: [null],
      in_whitelist: [null],
      name: [null, Validators.required],
      test_url: [null, [urlValidator]],
      match: [
        [
          Validators.required,
          Validators.pattern(/^https?:\/\/(\*|\*\.[^*/]+|[^*/]+)\/.*$/),
        ],
      ],
    });

    this.videoRefs$ = videoRefsService.getVideoRefs();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  approximateMatch(rawUrl: string) {
    const control = this.permissionForm.controls.match;

    if (control.value === '' || control.value == null) {
      return;
    }

    const url = this.convertUrl(control.value);

    if (url != null) {
      const approximateMatch = `${url.origin}/*`;
      control.setValue(approximateMatch);
    }
  }

  onCancel() {
    this.cancel.emit();
  }

  onSave(event: Event) {
    event.preventDefault();

    if (this.permissionForm.invalid) {
      return;
    }

    const permsSub = this.permsService
      .request({
        origins: [this.permissionForm.controls['match'].value],
      })
      .subscribe({
        next: () => {
          this.save.emit(this.permissionForm.value);
        },
        error: (err) => {
          this.errorHandler.handleError(err);
        },
      });
    this.subs.add(permsSub);
  }

  private convertUrl(rawUrl: string): URL | null {
    try {
      return new URL(rawUrl);
    } catch {
      return null;
    }
  }
}
