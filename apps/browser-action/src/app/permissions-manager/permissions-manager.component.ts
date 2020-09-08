import { PermissionsService, SavedPermission } from '@plopdown/permissions';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { WindowRefService } from '@plopdown/window-ref';
import {
  RuntimeService,
  PermissionsRequestService,
} from '@plopdown/browser-ref';
import { Component, OnDestroy } from '@angular/core';
import { LoggerService } from '@plopdown/logger';
import { map } from 'rxjs/operators';
import { mdiVideoBox, mdiVideoBoxOff } from '@mdi/js';

interface ValidatedPermission extends SavedPermission {
  in_whitelist: boolean;
}

@Component({
  selector: 'plopdown-permissions-manager',
  templateUrl: './permissions-manager.component.html',
  styleUrls: ['./permissions-manager.component.scss'],
})
export class PermissionsManagerComponent implements OnDestroy {
  public permissions$: Observable<ValidatedPermission[]>;
  public loadingPermissions$: Observable<boolean>;

  private subs: Subscription = new Subscription();

  public mdiVideoBox = mdiVideoBox;
  public mdiVideoBoxOff = mdiVideoBoxOff;

  constructor(
    private runtime: RuntimeService,
    private window: WindowRefService,
    private logger: LoggerService,
    permsService: PermissionsService,
    private permsReqService: PermissionsRequestService
  ) {
    this.loadingPermissions$ = permsService.getLoading();
    this.permissions$ = combineLatest([
      permsService.getPermissions(),
      permsReqService.getAll(),
    ]).pipe(
      map(([savedPerms, setPerms]) => {
        const allPerms: ValidatedPermission[] = savedPerms.map((perm) => {
          const in_whitelist = setPerms.origins?.includes(perm.match) || false;
          return { ...perm, in_whitelist };
        });

        return allPerms;
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

  public refreshPermissions() {
    this.permsReqService.refresh();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  openExtensionsPage(route: string) {
    const extUrl = this.runtime.getURL(route);
    this.window.open(extUrl);
    this.window.close();
  }
}
