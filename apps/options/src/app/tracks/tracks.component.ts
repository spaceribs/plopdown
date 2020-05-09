import { WindowRefService } from '@plopdown/window-ref';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SavedTrack, TracksService, Track } from '@plopdown/tracks';
import {
  mdiRefresh,
  mdiAlertCircle,
  mdiUpload,
  mdiPencil,
  mdiFileMultiple,
  mdiTrashCan
} from '@mdi/js';
import { tap } from 'rxjs/operators';
import { LoggerService } from '@plopdown/logger';

@Component({
  selector: 'plopdown-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {
  public loadingTracks$: Observable<boolean>;
  public tracks$: Observable<SavedTrack[]>;

  public editingTrack: SavedTrack | null = null;
  public showEditor = false;
  public showFileManager = false;
  public showTrackUploader = false;
  public confirmReset = false;

  public subs: Subscription = new Subscription();

  public mdiRefresh = mdiRefresh;
  public mdiAlertCircle = mdiAlertCircle;
  public mdiUpload = mdiUpload;
  public mdiPencil = mdiPencil;
  public mdiFileMultiple = mdiFileMultiple;
  public mdiTrashCan = mdiTrashCan;

  constructor(
    private tracksService: TracksService,
    private logger: LoggerService,
    private sanitizer: DomSanitizer,
    private windowRef: WindowRefService
  ) {
    this.tracks$ = tracksService.getTracks();
  }

  ngOnInit(): void {}

  public editTrack(track: SavedTrack) {
    this.editingTrack = track;
    this.showEditor = true;
  }

  public manageFiles(track: SavedTrack) {
    this.editingTrack = track;
    this.showFileManager = true;
  }

  public uploadTrack() {
    this.showTrackUploader = true;
  }

  getAttachment(track: SavedTrack, filename: string): SafeUrl {
    const attachment = track._attachments[filename];
    const url = URL.createObjectURL(attachment.data);
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  refreshTracks() {
    this.tracksService.refreshTracks();
  }

  public resetTracks() {
    if (this.confirmReset !== true) {
      this.confirmReset = true;
      setTimeout(() => {
        this.confirmReset = false;
      }, 3000);
      return;
    }

    const removeVideoRefSub = this.tracksService.resetTracks().subscribe({
      next: res => {
        this.logger.debug('Reset all Tracks', res);
        this.windowRef.reload();
      },
      error: err => {
        this.logger.error('Error Resetting All Tracks', err);
      }
    });
    this.subs.add(removeVideoRefSub);
  }

  removeTrack(track: SavedTrack) {
    const addSub = this.tracksService.removeTrack(track).subscribe({
      next: res => {
        this.logger.debug('Track Removed', res);
        this.showEditor = false;
      },
      error: err => {
        this.logger.error('Error Removing Track', err);
      }
    });
    this.subs.add(addSub);
  }

  public closeEdit() {
    this.showEditor = false;
    this.showFileManager = false;
    this.showTrackUploader = false;
  }

  public addOrUpdateTrack(track: SavedTrack | Track) {
    if (track['_id'] != null) {
      const updateSub = this.tracksService
        .updateTrack(track as SavedTrack)
        .subscribe({
          next: res => {
            this.logger.debug('Track Updated', res);
            this.closeEdit();
          },
          error: err => {
            this.logger.error('Error Updating Track', err);
          }
        });
      this.subs.add(updateSub);
    } else {
      const addSub = this.tracksService.addTrack(track as Track).subscribe({
        next: res => {
          this.logger.debug('Track Added', res);
          this.closeEdit();
        },
        error: err => {
          this.logger.error('Error Adding Track', err);
        }
      });
      this.subs.add(addSub);
    }
  }

  public updateFiles(attachments: SavedTrack['_attachments']) {
    this.editingTrack._attachments = attachments;
    this.addOrUpdateTrack(this.editingTrack);
    this.closeEdit();
  }

  public getCount(attachments: SavedTrack['_attachments']) {
    return Object.keys(attachments).length;
  }
}
