import { LzStringService } from '@plopdown/lz-string';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from '@plopdown/logger';
import { PermissionsRequestService } from '@plopdown/browser-ref';
import {
  Permission,
  PermissionsService,
  SavedPermission,
} from '@plopdown/permissions';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import {
  mdiRefresh,
  mdiAlertCircle,
  mdiPlus,
  mdiPencil,
  mdiTrashCan,
  mdiVideoBox,
  mdiVideoBoxOff,
  mdiTestTube,
} from '@mdi/js';
import { switchMap, map, shareReplay } from 'rxjs/operators';

interface ValidatedPermission extends SavedPermission {
  in_whitelist: boolean;
}

@Component({
  selector: 'plopdown-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent implements OnDestroy {
  public confirmReset = false;

  public loadingPermissions$: Observable<boolean>;
  public permissions$: Observable<ValidatedPermission[]>;

  public mdiRefresh = mdiRefresh;
  public mdiAlertCircle = mdiAlertCircle;
  public mdiPlus = mdiPlus;
  public mdiPencil = mdiPencil;
  public mdiTrashCan = mdiTrashCan;
  public mdiVideoBox = mdiVideoBox;
  public mdiVideoBoxOff = mdiVideoBoxOff;
  public mdiTestTube = mdiTestTube;

  public editingPermission: Permission | SavedPermission | null = null;
  public showEditor = false;
  private subs: Subscription = new Subscription();
  public testPattern$: Observable<string>;

  constructor(
    private permsService: PermissionsService,
    private permsReqService: PermissionsRequestService,
    private logger: LoggerService,
    http: HttpClient,
    lzString: LzStringService
  ) {
    this.permissions$ = combineLatest([
      permsService.getPermissions(),
      this.permsReqService.getAll(),
    ]).pipe(
      map(([savedPerms, setPerms]) => {
        const allPerms: ValidatedPermission[] = savedPerms.map((perm) => {
          const in_whitelist = setPerms.origins?.includes(perm.match) || false;
          return { ...perm, in_whitelist };
        });

        return allPerms;
      })
    );

    this.loadingPermissions$ = permsService.getLoading();

    this.testPattern$ = http
      .get('/background/assets/test_pattern.vtt', { responseType: 'text' })
      .pipe(
        map((raw) => {
          return lzString.compressURI(raw);
        }),
        shareReplay(1)
      );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public refreshPermissions() {
    this.permsReqService.refresh();
  }

  public addPermission() {
    this.editingPermission = null;
    this.showEditor = true;
  }

  private isSavedPermission(
    permission: Permission | SavedPermission
  ): permission is SavedPermission {
    return '_id' in permission;
  }

  public addOrUpdatePermission(permission: Permission | SavedPermission) {
    if (this.isSavedPermission(permission)) {
      const updateSub = this.permsService
        .updatePermission(permission as SavedPermission)
        .subscribe({
          next: (res) => {
            this.logger.debug('Permission Updated', res);
            this.showEditor = false;
          },
          error: (err) => {
            this.logger.error('Error Updating Permission', err);
          },
        });
      this.subs.add(updateSub);
    } else {
      const addSub = this.permsService.addPermission(permission).subscribe({
        next: (res) => {
          this.logger.debug('Permission Added', res);
          this.showEditor = false;
        },
        error: (err) => {
          this.logger.error('Error Adding Permission', err);
        },
      });
      this.subs.add(addSub);
    }
  }

  public editPermission(perm: SavedPermission) {
    this.editingPermission = perm;
    this.showEditor = true;
  }

  public getTestPermLink$(perm: SavedPermission): Observable<string | null> {
    return this.testPattern$.pipe(
      map((testPattern) => {
        if (perm.test_url != null) {
          return `${perm.test_url}#plopdown:${testPattern}`;
        }
        return null;
      })
    );
  }

  public unAuthPermission(perm: SavedPermission) {
    const unAuthPermSub = this.permsReqService
      .remove({ origins: [perm.match] })
      .subscribe({
        next: (res) => {
          this.logger.debug('Permission Removed', res);
          this.refreshPermissions();
        },
        error: (err) => {
          this.logger.error('Error Removing Permission', err);
        },
      });
    this.subs.add(unAuthPermSub);
  }

  public authPermission(perm: SavedPermission) {
    const authPermSub = this.permsReqService
      .request({ origins: [perm.match] })
      .subscribe({
        next: (res) => {
          this.logger.debug('Permission Requested', res);
          this.refreshPermissions();
        },
        error: (err) => {
          this.logger.error('Error Requesting Permission', err);
        },
      });
    this.subs.add(authPermSub);
  }

  public removePermission(perm: SavedPermission) {
    const removeSub = this.permsReqService
      .remove({
        origins: [perm.match],
      })
      .pipe(
        switchMap(() => {
          return this.permsService.removePermission(perm);
        })
      )
      .subscribe({
        next: (res) => {
          this.logger.debug('Permission Removed', res);
          this.showEditor = false;
        },
        error: (err) => {
          this.logger.error('Error Removing Permission', err);
        },
      });
    this.subs.add(removeSub);
  }

  public closeEdit() {
    this.showEditor = false;
  }
}
