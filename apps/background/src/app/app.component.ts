import { BrowserActionService, IconState } from '@plopdown/browser-ref';
import { filter, map, shareReplay } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, ErrorHandler } from '@angular/core';
import { ExtStorageAreaName, ExtStorageService } from '@plopdown/ext-storage';
import { merge, Observable, Subscription } from 'rxjs';

@Component({
  template: `
    <plopdown-new-install></plopdown-new-install>
    <ng-container *ngIf="extEnabled$ | async">
      <plopdown-get-status></plopdown-get-status>
      <plopdown-install-content-script></plopdown-install-content-script>
      <plopdown-tracks-requested></plopdown-tracks-requested>
      <plopdown-video-refs-requested></plopdown-video-refs-requested>
      <plopdown-sync-databases></plopdown-sync-databases>
      <plopdown-devtool-content-script></plopdown-devtool-content-script>
    </ng-container>
  `,
  selector: 'plopdown-background',
})
export class AppComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();

  public extEnabled$: Observable<boolean>;

  constructor(
    extStore: ExtStorageService,
    private errorHandler: ErrorHandler,
    private browserAction: BrowserActionService
  ) {
    const extEnabledInit$ = extStore.get(
      ExtStorageAreaName.Sync,
      'extension_enabled'
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
  }

  ngOnInit(): void {
    const setIconSub = this.extEnabled$.subscribe({
      next: (enabled) => {
        this.browserAction.setIcon(
          enabled ? IconState.Ready : IconState.Disabled
        );
      },
      error: (err) => {
        this.errorHandler.handleError(err);
      },
    });
    this.subs.add(setIconSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
