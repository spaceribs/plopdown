import { Track } from '@plopdown/tracks';
import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectorRef,
  ErrorHandler,
  Input,
} from '@angular/core';

import { mdiClose, mdiTooltipEdit, mdiTooltipPlus } from '@mdi/js';
import { SafeUrl } from '@angular/platform-browser';
import {
  trigger,
  transition,
  sequence,
  style,
  animate,
} from '@angular/animations';
import { Observable, Subject, Subscription } from 'rxjs';
import { TracksModalComponent } from './tracks-modal/tracks-modal.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'plopdown-embed-menu',
  templateUrl: './embed-menu.component.html',
  styleUrls: ['./embed-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('menuSlideout', [
      transition(
        'void => *',
        sequence([
          style({
            width: '0',
            marginRight: '0',
          }),
          animate(
            '0.2s ease-out',
            style({
              width: '*',
              marginRight: '*',
            })
          ),
        ])
      ),
      transition(
        '* => void',
        sequence([
          style({
            width: '*',
            marginRight: '*',
          }),
          animate(
            '0.2s ease-out',
            style({
              width: '0',
              marginRight: '0',
            })
          ),
        ])
      ),
    ]),
  ],
})
export class EmbedMenuComponent implements OnDestroy {
  public mdiClose = mdiClose;
  public mdiTooltipEdit = mdiTooltipEdit;
  public mdiTooltipPlus = mdiTooltipPlus;
  public overlayRef = this.overlay.create();

  public plopdownLogo$: Observable<SafeUrl>;
  private toggleEditMode$: Subject<void> = new Subject();

  public slideoutShown = false;

  @Input() tracks: Track[];
  @Input() track: Track | null;
  @Output() fullscreen: EventEmitter<void> = new EventEmitter();
  @Output() trackChange: EventEmitter<Track> = new EventEmitter();
  @Output() remove: EventEmitter<void> = new EventEmitter();
  @Output() upload: EventEmitter<void> = new EventEmitter();
  @Output() addAnnotation: EventEmitter<void> = new EventEmitter();
  @Output() saveVideoRef: EventEmitter<Track> = new EventEmitter();

  private subs: Subscription = new Subscription();

  constructor(
    private cd: ChangeDetectorRef,
    private overlay: Overlay,
    private errorHandler: ErrorHandler
  ) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onFullscreen(event: Event) {
    event.preventDefault();
    this.fullscreen.emit();
  }

  onSelectTrack(event: Event) {
    event.preventDefault();

    const trackModalPortal = new ComponentPortal(TracksModalComponent);
    const trackModal = this.overlayRef.attach(trackModalPortal);

    trackModal.instance.track = this.track;
    trackModal.instance.tracks = this.tracks;
    trackModal.changeDetectorRef.detectChanges();

    const trackChangeSub = trackModal.instance.trackChange.subscribe({
      next: (track: Track) => {
        this.trackChange.next(track);
      },
      error: (err: Error) => {
        this.errorHandler.handleError(err);
      },
    });
    this.subs.add(trackChangeSub);

    const saveVideoRefSub = trackModal.instance.saveVideoRef.subscribe({
      next: (track: Track) => {
        this.saveVideoRef.next(track);
      },
      error: (err: Error) => {
        this.errorHandler.handleError(err);
      },
    });
    this.subs.add(saveVideoRefSub);

    const closeSub = trackModal.instance.closeModal.subscribe({
      next: () => {
        this.overlayRef.detach();
        closeSub.unsubscribe();
      },
      error: (err: Error) => {
        this.errorHandler.handleError(err);
      },
    });
    this.subs.add(closeSub);
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
