import { WindowRefService } from '@plopdown/window-ref';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { TracksService, Track } from '@plopdown/tracks';
import {
  mdiRefresh,
  mdiAlertCircle,
  mdiUpload,
  mdiPencil,
  mdiFileMultiple,
  mdiTrashCan,
} from '@mdi/js';
import { LoggerService } from '@plopdown/logger';

@Component({
  selector: 'plopdown-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss'],
})
export class TracksComponent implements OnDestroy {
  public loadingTracks$: Observable<boolean>;
  public tracks$: Observable<Track[]>;

  public editingTrack: Track | null = null;
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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public editTrack(track: Track) {
    this.editingTrack = track;
    this.showEditor = true;
  }

  public manageFiles(track: Track) {
    this.editingTrack = track;
    this.showFileManager = true;
  }

  public uploadTrack() {
    this.showTrackUploader = true;
  }

  getAttachment(track: Track, filename?: string): SafeUrl | null {
    if (filename == null) {
      return null;
    }
    if (track._attachments == null) {
      return null;
    }
    const attachment = track._attachments[filename];
    const url = this.windowRef.getURL().createObjectURL(attachment.data);
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
      next: (res) => {
        this.logger.debug('Reset all Tracks', res);
        this.windowRef.reload();
      },
      error: (err) => {
        this.logger.error('Error Resetting All Tracks', err);
      },
    });
    this.subs.add(removeVideoRefSub);
  }

  removeTrack(track: Track) {
    const removeSub = this.tracksService.removeTrack(track).subscribe({
      next: (res) => {
        this.logger.debug('Track Removed', res);
        this.showEditor = false;
      },
      error: (err) => {
        this.logger.error('Error Removing Track', err);
      },
    });
    this.subs.add(removeSub);
  }

  public closeEdit() {
    this.showEditor = false;
    this.showFileManager = false;
    this.showTrackUploader = false;
  }

  public addOrUpdateTrack(track: Track) {
    if (track['_id'] != null) {
      const updateSub = this.tracksService
        .updateTrack(track as Track)
        .subscribe({
          next: (res) => {
            this.logger.debug('Track Updated', res);
            this.closeEdit();
          },
          error: (err) => {
            this.logger.error('Error Updating Track', err);
          },
        });
      this.subs.add(updateSub);
    } else {
      const addSub = this.tracksService.addTrack(track as Track).subscribe({
        next: (res) => {
          this.logger.debug('Track Added', res);
          this.closeEdit();
        },
        error: (err) => {
          this.logger.error('Error Adding Track', err);
        },
      });
      this.subs.add(addSub);
    }
  }

  public updateFiles(attachments: Track['_attachments']) {
    if (this.editingTrack == null) {
      return;
    }
    this.editingTrack._attachments = attachments;
    this.addOrUpdateTrack(this.editingTrack);
    this.closeEdit();
  }

  public getCount(attachments: Track['_attachments']): number {
    if (attachments == null) {
      return 0;
    }
    return Object.keys(attachments).length;
  }
}
