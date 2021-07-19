import { RemotesService } from '@plopdown/remotes';
import { PermissionsService } from '@plopdown/permissions';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '@plopdown/logger';
import { Component, OnInit, ErrorHandler, OnDestroy } from '@angular/core';
import { OnInstalledDetails, RuntimeService } from '@plopdown/browser-ref';
import { forkJoin, Observable, of, Subscription } from 'rxjs';
import { filter, first, switchMap, tap } from 'rxjs/operators';
import { ExtStorageAreaName, ExtStorageService } from '@plopdown/ext-storage';

@Component({
  selector: 'plopdown-new-install',
  template: 'new-install',
})
export class NewInstallComponent implements OnInit, OnDestroy {
  private onNewInstall$: Observable<OnInstalledDetails>;
  private onUpdate$: Observable<OnInstalledDetails>;
  private subs: Subscription = new Subscription();

  constructor(
    private runtime: RuntimeService,
    private logger: LoggerService,
    private errorHandler: ErrorHandler,
    private permsService: PermissionsService,
    private extStorage: ExtStorageService,
    private remotesService: RemotesService,
    private http: HttpClient
  ) {
    this.onNewInstall$ = runtime.getOnInstalled().pipe(
      filter((details) => details.reason === 'install'),
      first()
    );

    this.onUpdate$ = runtime.getOnInstalled().pipe(
      filter((details) => details.reason === 'update'),
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
          return forkJoin([this.addBasicPerms(), this.addMainFeed()]);
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

    const updateSub = this.onUpdate$
      .pipe(
        tap(() => {
          this.logger.info('Extension Update Detected');
        }),
        switchMap(() => {
          return forkJoin([this.addMainFeed()]);
        })
      )
      .subscribe({
        next: () => {
          this.runtime.openOptionsPage();
        },
        error: (err) => {
          this.errorHandler.handleError(err);
        },
      });
    this.subs.add(updateSub);
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

  private addMainFeed() {
    return this.remotesService.getRemotes().pipe(
      switchMap((remotes) => {
        const existingMainFeed = remotes.find(
          (remote) => remote.title === 'Plopdown Main Feed'
        );

        if (existingMainFeed == null) {
          return this.remotesService.addRemote({
            url: 'https://d8d30792-a35b-4bd0-9e83-8c667c6cfee6-bluemix.cloudantnosqldb.appdomain.cloud',
            title: 'Plopdown Main Feed',
            username: 'apikey-b6480e0220b34c88bb220ec73f3141e4',
            password: '4a427fd250107198af40dba5b90006f111528dee',
            sync: false,
            error: null,
            last_replicated: null,
          });
        }
        return of(existingMainFeed);
      }),
      first()
    );
  }
}
