import { PermissionsService } from '@plopdown/permissions';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '@plopdown/logger';
import { Component, OnInit, ErrorHandler, OnDestroy } from '@angular/core';
import { OnInstalledDetails, RuntimeService } from '@plopdown/browser-ref';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { PlopdownFile, PlopdownFileService } from '@plopdown/plopdown-file';
import { Track, TracksService } from '@plopdown/tracks';
import { ExtStorageAreaName, ExtStorageService } from '@plopdown/ext-storage';

@Component({
  selector: 'plopdown-new-install',
  template: 'new-install',
})
export class NewInstallComponent implements OnInit, OnDestroy {
  private onNewInstall$: Observable<OnInstalledDetails>;
  private subs: Subscription = new Subscription();

  constructor(
    private runtime: RuntimeService,
    private logger: LoggerService,
    private errorHandler: ErrorHandler,
    private fileService: PlopdownFileService,
    private tracksService: TracksService,
    private permsService: PermissionsService,
    private extStorage: ExtStorageService,
    private http: HttpClient
  ) {
    this.onNewInstall$ = runtime.getOnInstalled().pipe(
      filter((details) => details.reason === 'install'),
      first()
    );
  }

  ngOnInit(): void {
    const newInstallSub = this.onNewInstall$
      .pipe(
        tap(() => {
          this.logger.info('First Time Install Detected');
        }),
        switchMap(() => {
          return forkJoin([
            this.addIntroTrack(),
            this.addTestPatternTrack(),
            this.addBasicPerms(),
          ]);
        })
      )
      .subscribe({
        next: () => {
          this.extStorage.set(ExtStorageAreaName.Sync, {
            extension_enabled: true,
          });
          this.runtime.openOptionsPage();
        },
        error: (err) => {
          this.errorHandler.handleError(err);
        },
      });
    this.subs.add(newInstallSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private addBasicPerms() {
    const youtubePerms$ = this.permsService.addPermission({
      name: 'YouTube',
      test_url: 'https://www.youtube.com/watch?v=C0DPdy98e4c',
      match: '*://*.youtube.com/*',
    });

    const netflixPerms$ = this.permsService.addPermission({
      name: 'Netflix',
      test_url: 'https://www.netflix.com/watch/80018586',
      match: '*://*.netflix.com/*',
    });

    return forkJoin([youtubePerms$, netflixPerms$]);
  }

  private addIntroTrack() {
    const getTrack$ = this.http
      .get('/background/assets/intro.vtt', { responseType: 'text' })
      .pipe(
        map((raw) => {
          const file: PlopdownFile = this.fileService.decode(raw);

          const introTrack: Track = {
            _id: 'a45d69ab-6d7d-40c0-80e7-9642d16d66ec',
            title: file.headers.title,
            for: file.headers.for,
            created: file.headers.created,
            thumbnail: file.headers.thumbnail,
            authors: file.headers.authors,
            language: file.headers.language,
            license: file.headers.license,
            cues: file.cues,
          };

          return introTrack;
        })
      );

    const getSound$ = this.http
      .get('/background/assets/classics.mp3', {
        responseType: 'blob',
      })
      .pipe(
        map((blob) => {
          return new File([blob], 'classics.mp3', {
            type: blob.type,
          });
        }),
        first()
      );

    const getThumbnail$ = this.http
      .get('/background/assets/thumbnail.png', {
        responseType: 'blob',
      })
      .pipe(
        map((blob) => {
          return new File([blob], 'thumbnail.png', {
            type: blob.type,
          });
        }),
        first()
      );

    return forkJoin([getTrack$, getSound$, getThumbnail$]).pipe(
      switchMap(([track, sound, thumbnail]) => {
        return this.tracksService.addTrack({
          ...track,
          _attachments: {
            'classics.mp3': {
              content_type: sound.type,
              data: sound,
            },
            'thumbnail.png': {
              content_type: thumbnail.type,
              data: thumbnail,
            },
          },
        });
      })
    );
  }

  private addTestPatternTrack() {
    const getTrack$ = this.http
      .get('/background/assets/test_pattern.vtt', { responseType: 'text' })
      .pipe(
        map((raw) => {
          const file: PlopdownFile = this.fileService.decode(raw);

          const introTrack: Track = {
            _id: 'fa5ea3f6-3dd8-484f-a534-59d325e92766',
            title: file.headers.title,
            for: file.headers.for,
            created: file.headers.created,
            thumbnail: file.headers.thumbnail,
            authors: file.headers.authors,
            language: file.headers.language,
            license: file.headers.license,
            cues: file.cues,
          };

          return introTrack;
        })
      );

    const getThumbnail$ = this.http
      .get('/background/assets/test_pattern.png', {
        responseType: 'blob',
      })
      .pipe(
        map((blob) => {
          return new File([blob], 'test_pattern.png', {
            type: blob.type,
          });
        }),
        first()
      );

    return forkJoin([getTrack$, getThumbnail$]).pipe(
      switchMap(([track, thumbnail]) => {
        return this.tracksService.addTrack({
          ...track,
          _attachments: {
            'test_pattern.png': {
              content_type: thumbnail.type,
              data: thumbnail,
            },
          },
        });
      })
    );
  }
}
