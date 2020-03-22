import { PlopdownFileService, PlopdownFile } from '@plopdown/plopdown-file';
import { VideoRefsService, VideoRef } from '@plopdown/video-refs';
import { Component, OnDestroy, OnInit, ErrorHandler } from '@angular/core';
import { RuntimeService, OnInstalledDetails } from '@plopdown/browser';
import { PortNames } from '@plopdown/ports';
import { Subscription, Observable, concat } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Track, TracksService } from '@plopdown/tracks';
import content from '../assets/intro.vtt';

@Component({
  template: ''
})
export class AppComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();
  private onNewInstall$: Observable<OnInstalledDetails>;
  private onBrowserActionPort$: Observable<browser.runtime.Port>;
  private onContentScriptPort$: Observable<browser.runtime.Port>;
  private videoRefs$: Observable<Array<VideoRef>>;

  constructor(
    private errorHandler: ErrorHandler,
    private fileService: PlopdownFileService,
    private tracksService: TracksService,
    private runtime: RuntimeService,
    vRefService: VideoRefsService
  ) {
    this.onNewInstall$ = runtime
      .getOnInstalled()
      .pipe(filter(details => details.reason === 'install'));

    this.onBrowserActionPort$ = runtime
      .getOnConnect()
      .pipe(
        filter(port => (port.name as PortNames) === PortNames.BrowserAction)
      );

    this.onContentScriptPort$ = runtime
      .getOnConnect()
      .pipe(
        filter(port => (port.name as PortNames) === PortNames.ContentScript)
      );

    this.videoRefs$ = vRefService.getVideoRefs();
  }

  ngOnInit(): void {
    const newInstallSub = this.onNewInstall$
      .pipe(
        switchMap(() => {
          return concat(this.addIntroTrack(), this.runtime.openOptionsPage());
        })
      )
      .subscribe({
        next: () => {
          console.log('First time install detected');
        },
        error: err => {
          this.errorHandler.handleError(err);
        }
      });

    this.subs.add(newInstallSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private addIntroTrack() {
    const file: PlopdownFile = this.fileService.decode(content);

    const introTrack: Track = {
      id: file.headers.id,
      title: file.headers.title,
      for: file.headers.for,
      created: file.headers.created,
      cues: file.cues
    };

    return this.tracksService.setTracks([introTrack]);
  }
}
