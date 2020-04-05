import { RuntimeService } from '@plopdown/browser-ref';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  ChangeDetectorRef
} from '@angular/core';

import { mdiClose, mdiTooltipEdit, mdiTooltipPlus } from '@mdi/js';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'plopdown-overlay-menu',
  templateUrl: './overlay-menu.component.html',
  styleUrls: ['./overlay-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayMenuComponent implements OnInit {
  public mdiClose = mdiClose;
  public mdiTooltipEdit = mdiTooltipEdit;
  public mdiTooltipPlus = mdiTooltipPlus;

  public plopdownLogo: SafeUrl;

  public slideoutShown = false;
  @Input() public tracks = 0;
  @Input() public editing = false;
  @Output() fullscreen: EventEmitter<void> = new EventEmitter();
  @Output() remove: EventEmitter<void> = new EventEmitter();
  @Output() upload: EventEmitter<void> = new EventEmitter();
  @Output() addAnnotation: EventEmitter<void> = new EventEmitter();
  @Output() edit: EventEmitter<void> = new EventEmitter();

  constructor(
    runtime: RuntimeService,
    sanitizer: DomSanitizer,
    private cd: ChangeDetectorRef
  ) {
    this.plopdownLogo = sanitizer.bypassSecurityTrustUrl(
      runtime.getURL('/icons/plopdown-logo.svg')
    );
  }

  ngOnInit(): void {}

  onFullscreen() {
    this.fullscreen.emit();
  }

  onRemovePlopdown() {
    this.remove.emit();
  }

  onUploadPlopdown() {
    this.upload.emit();
  }

  onAddAnnotation() {
    this.addAnnotation.emit();
  }

  onToggleEdit() {
    this.edit.emit();
  }

  onMouseEnter() {
    this.slideoutShown = true;
    this.cd.detectChanges();
  }

  onMouseLeave() {
    this.slideoutShown = false;
    this.cd.detectChanges();
  }
}
