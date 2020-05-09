import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SavedTrack, TracksService } from '@plopdown/tracks';
import { mdiRefresh, mdiAlertCircle, mdiUpload } from '@mdi/js';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'plopdown-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {
  public loadingTracks$: Observable<boolean>;
  public tracks$: Observable<SavedTrack[]>;

  public showEditor = false;
  public showTrackSelector = false;
  public confirmReset = false;

  public subs: Subscription = new Subscription();

  public mdiRefresh = mdiRefresh;
  public mdiAlertCircle = mdiAlertCircle;
  public mdiUpload = mdiUpload;

  constructor(
    private tracksService: TracksService,
    private sanitizer: DomSanitizer
  ) {
    this.tracks$ = tracksService.getTracks().pipe(tap(console.log));
  }

  ngOnInit(): void {}

  getAttachment(track: SavedTrack, filename: string): SafeUrl {
    const attachment = track._attachments[filename];
    console.log(attachment);
    const url = URL.createObjectURL(attachment.data);
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  refreshTracks() {}

  uploadTrack() {}

  resetTracks() {}
}
