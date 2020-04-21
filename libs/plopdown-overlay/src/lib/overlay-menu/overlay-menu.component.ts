import {
  Component,
  OnInit,
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
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import { EditModeService } from '../edit-mode.service';
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
export class OverlayMenuComponent implements OnInit, OnDestroy {
  public mdiClose = mdiClose;
  public mdiTooltipEdit = mdiTooltipEdit;
  public mdiTooltipPlus = mdiTooltipPlus;

  public plopdownLogo$: Observable<SafeUrl>;
  public editModeEnabled$: Observable<boolean>;
  public toggleEditMode$: Subject<void> = new Subject();

  public slideoutShown = false;
  @Input() public tracks = 0;
  @Output() fullscreen: EventEmitter<void> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();
  @Output() remove: EventEmitter<void> = new EventEmitter();
  @Output() upload: EventEmitter<void> = new EventEmitter();
  @Output() addAnnotation: EventEmitter<void> = new EventEmitter();

  private subs: Subscription = new Subscription();

  constructor(
    private cd: ChangeDetectorRef,
    loadAsset: LoadAssetService,
    private editModeService: EditModeService
  ) {
    this.plopdownLogo$ = loadAsset.asText('/icons/plopdown-logo.svg').pipe(
      tap(() => {
        setTimeout(() => {
          this.cd.detectChanges();
        }, 0);
      })
    );

    this.editModeEnabled$ = editModeService.getEditModeEnabled();
  }

  ngOnInit(): void {
    const toggleEditSub = this.toggleEditMode$
      .pipe(
        withLatestFrom(this.editModeEnabled$),
        map(([_, editing]) => editing)
      )
      .subscribe(editing => {
        this.editModeService.setEditMode(!editing);
        this.cd.detectChanges();
      });
    this.subs.add(toggleEditSub);
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
