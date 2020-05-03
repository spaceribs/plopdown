import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';

import { mdiClose, mdiTooltipEdit, mdiTooltipPlus } from '@mdi/js';
import { SafeUrl } from '@angular/platform-browser';
import {
  trigger,
  transition,
  sequence,
  style,
  animate
} from '@angular/animations';
import { tap } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import { LoadAssetService } from '../load-asset.service';

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
            width: '0',
            marginRight: '0'
          }),
          animate(
            '0.2s ease-out',
            style({
              width: '*',
              marginRight: '*'
            })
          )
        ])
      ),
      transition(
        '* => void',
        sequence([
          style({
            width: '*',
            marginRight: '*'
          }),
          animate(
            '0.2s ease-out',
            style({
              width: '0',
              marginRight: '0'
            })
          )
        ])
      )
    ])
  ]
})
export class OverlayMenuComponent implements OnDestroy {
  public mdiClose = mdiClose;
  public mdiTooltipEdit = mdiTooltipEdit;
  public mdiTooltipPlus = mdiTooltipPlus;

  public plopdownLogo$: Observable<SafeUrl>;
  public toggleEditMode$: Subject<void> = new Subject();

  public slideoutShown = false;
  @Input() public tracks = 0;
  @Output() fullscreen: EventEmitter<void> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();
  @Output() remove: EventEmitter<void> = new EventEmitter();
  @Output() upload: EventEmitter<void> = new EventEmitter();
  @Output() addAnnotation: EventEmitter<void> = new EventEmitter();

  private subs: Subscription = new Subscription();

  constructor(private cd: ChangeDetectorRef, loadAsset: LoadAssetService) {
    this.plopdownLogo$ = loadAsset.asText('/icons/plopdown-logo.svg').pipe(
      tap(() => {
        setTimeout(() => {
          this.cd.detectChanges();
        }, 0);
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

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
    this.toggleEditMode$.next();
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
