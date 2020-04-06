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
import {
  trigger,
  transition,
  sequence,
  style,
  animate
} from '@angular/animations';
import { LoadAssetService } from '../load-asset.service';
import { map, tap, timeout } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'plopdown-overlay-menu',
  templateUrl: './overlay-menu.component.html',
  styleUrls: ['./overlay-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('menuSlideout', [
      transition(
        'void => *',
        sequence([
          style({
            width: '0'
          }),
          animate(
            '0.2s ease-out',
            style({
              width: '*'
            })
          )
        ])
      ),
      transition(
        '* => void',
        sequence([
          style({
            width: '*'
          }),
          animate(
            '0.2s ease-out',
            style({
              width: '0'
            })
          )
        ])
      )
    ])
  ]
})
export class OverlayMenuComponent implements OnInit {
  public mdiClose = mdiClose;
  public mdiTooltipEdit = mdiTooltipEdit;
  public mdiTooltipPlus = mdiTooltipPlus;

  public plopdownLogo$: Observable<SafeUrl>;

  public slideoutShown = false;
  @Input() public tracks = 0;
  @Input() public editing = false;
  @Output() fullscreen: EventEmitter<void> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();
  @Output() remove: EventEmitter<void> = new EventEmitter();
  @Output() upload: EventEmitter<void> = new EventEmitter();
  @Output() addAnnotation: EventEmitter<void> = new EventEmitter();
  @Output() edit: EventEmitter<void> = new EventEmitter();

  constructor(private cd: ChangeDetectorRef, loadAsset: LoadAssetService) {
    this.plopdownLogo$ = loadAsset.asText('/icons/plopdown-logo.svg').pipe(
      tap(() => {
        setTimeout(() => {
          this.cd.detectChanges();
        }, 0);
      })
    );
  }

  ngOnInit(): void {}

  onFullscreen(event: Event) {
    event.preventDefault();
    this.fullscreen.emit();
  }

  onCreatePlopdown(event: Event) {
    event.preventDefault();
    this.create.emit();
  }

  onRemovePlopdown(event: Event) {
    event.preventDefault();
    this.remove.emit();
  }

  onUploadPlopdown(event: Event) {
    event.preventDefault();
    this.upload.emit();
  }

  onAddAnnotation(event: Event) {
    event.preventDefault();
    this.addAnnotation.emit();
  }

  onToggleEdit(event: Event) {
    event.preventDefault();
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
