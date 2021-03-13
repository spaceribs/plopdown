import { mdiRadar } from '@mdi/js';
import { LoggerService } from '@plopdown/logger';
import {
  BrowserActionPubService,
  BackgroundSubService,
  BackgroundStatus,
} from '@plopdown/messages';
import { TracksService } from '@plopdown/tracks';
import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ErrorHandler,
} from '@angular/core';
import {
  Observable,
  Subscription,
  combineLatest,
  Subject,
  merge,
  of,
} from 'rxjs';
import { map, shareReplay, filter, switchMap, first } from 'rxjs/operators';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeOut, fadeIn } from 'ng-animate';
import {
  PermissionsRequestService,
  RuntimeService,
  TabsService,
} from '@plopdown/browser-ref';
import { WindowRefService } from '@plopdown/window-ref';
import { PermissionsService } from '@plopdown/permissions';
import { ExtStorageAreaName, ExtStorageService } from '@plopdown/ext-storage';

enum ActionState {
  Disabled = 'DISABLED',
  NoPerms = 'NO_PERMS',
  NoTracks = 'NO_TRACKS',
  NoVideoRefs = 'NO_VIDEOREFS',
  NoAccess = 'NO_ACCESS',
  Ready = 'READY',
}

@Component({
  selector: 'plopdown-browser-action',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(
        'void => *',
        useAnimation(fadeIn, {
          params: { timing: 0.2 },
        })
      ),
      transition(
        '* => void',
        useAnimation(fadeOut, {
          params: { timing: 0.2 },
        })
      ),
    ]),
  ],
})
export class ScannerComponent implements OnInit, OnDestroy, AfterViewInit {
  public ActionState = ActionState;
  public mdiRadar = mdiRadar;

  public state$: Observable<ActionState>;
  public extEnabled$: Observable<boolean>;
  private onQueryStatus$: Subject<void> = new Subject();

  private subs: Subscription = new Subscription();

  public bgStatus$: Observable<BackgroundStatus>;

  constructor(
    private runtime: RuntimeService,
    private window: WindowRefService,
    private logger: LoggerService,
    private baPub: BrowserActionPubService,
    private extStore: ExtStorageService,
    private permsService: PermissionsService,
    private permsReqService: PermissionsRequestService,
    private errorHandler: ErrorHandler,
    private tabs: TabsService,
    bgSub: BackgroundSubService,
    tracksService: TracksService
  ) {
    this.bgStatus$ = bgSub.getStatus().pipe(
      map((command) => {
        return command.args[0];
      }),
      shareReplay(1)
    );

    const extEnabledInit$ = extStore
      .get(ExtStorageAreaName.Sync, 'extension_enabled')
      .pipe(
        map((change) => {
          return change.extension_enabled || false;
        })
      );
    const extEnabledChange$ = extStore.getOnChanged().pipe(
      filter(([_, area]) => area === ExtStorageAreaName.Sync),
      map(([change]) => {
        return change.extension_enabled.newValue || false;
      })
    );
    this.extEnabled$ = merge(extEnabledInit$, extEnabledChange$).pipe(
      shareReplay(1)
    );

    this.state$ = combineLatest([
      this.extEnabled$,
      this.bgStatus$,
      tracksService.getTracks(),
      permsService.getPermissions(),
    ]).pipe(
      map(([enabled, bgStatus, tracks, perms]) => {
        if (enabled !== true) {
          return ActionState.Disabled;
        }

        if (tracks.length < 1) {
          return ActionState.NoTracks;
        }

        if (perms.length < 1) {
          return ActionState.NoPerms;
        }

        if (bgStatus.active_allowed !== true) {
          return ActionState.NoAccess;
        }

        return ActionState.Ready;
      }),
      shareReplay(1)
    );
  }

  ngOnInit(): void {
    const stateSub = this.state$.subscribe({
      next: (state) => {
        this.logger.debug('State Updated', state);
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      },
    });
    this.subs.add(stateSub);

    const queryStatusSub = this.onQueryStatus$.subscribe({
      next: () => {
        this.baPub.queryStatus();
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      },
    });
    this.subs.add(queryStatusSub);
  }

  ngAfterViewInit(): void {
    this.queryStatus();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public openExtensionsPage(route: string) {
    const extUrl = this.runtime.getURL(route);
    this.window.open(extUrl);
  }

  public queryStatus() {
    this.onQueryStatus$.next();
  }

  public toggleExtension(enabled: boolean | null) {
    this.extStore.set(ExtStorageAreaName.Sync, { extension_enabled: !enabled });
  }

  public requestOrigin(origin: string) {
    if (origin === null) {
      this.logger.warn('Origin to request was not found.');
      return;
    }

    const setPermsSub = this.permsReqService
      .request({
        origins: [origin],
      })
      .pipe(
        switchMap(() => {
          return this.permsService.addPermission({
            name: origin,
            test_url: null,
            match: origin,
          });
        }),
        switchMap(() => {
          return this.tabs.getActiveTab().pipe(
            first(),
            switchMap((tab) => {
              if (tab.id == null) {
                return of();
              }
              return this.tabs.reload(tab.id);
            })
          );
        })
      )
      .subscribe({
        error: (err) => {
          this.errorHandler.handleError(err);
        },
      });

    this.subs.add(setPermsSub);
  }
}
