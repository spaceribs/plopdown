import { switchMap, shareReplay, mapTo, map } from 'rxjs/operators';
import { LogStorageService } from '@plopdown/logger';
import {
  Observable,
  Subject,
  merge,
  BehaviorSubject,
  Subscription,
} from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { mdiRefresh, mdiAlertCircle, mdiDownload } from '@mdi/js';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'plopdown-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.scss'],
})
export class LogViewerComponent implements OnInit, OnDestroy {
  public confirmReset = false;

  public loadingLogs$: Observable<boolean>;
  public logsDownload$: Observable<SafeUrl>;
  public logs$: Observable<string[][]>;

  public mdiRefresh = mdiRefresh;
  public mdiDownload = mdiDownload;
  public mdiAlertCircle = mdiAlertCircle;

  private loadLogs$: Subject<null> = new BehaviorSubject(null);

  private subs: Subscription = new Subscription();

  constructor(
    private logStorage: LogStorageService,
    private santizer: DomSanitizer
  ) {
    this.logs$ = this.loadLogs$.pipe(
      switchMap(() => {
        return this.logStorage.getLogs();
      }),
      shareReplay(1)
    );

    this.logsDownload$ = this.logs$.pipe(
      map((logs) => {
        const blob = new Blob([JSON.stringify(logs)], { type: 'text/json' });
        return this.santizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(blob)
        );
      })
    );

    this.loadingLogs$ = merge(
      this.loadLogs$.pipe(mapTo(true)),
      this.logs$.pipe(mapTo(false))
    );
  }

  ngOnInit(): void {
    this.refreshLogs();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  refreshLogs(): void {
    this.loadLogs$.next(null);
  }

  resetLogs(): void {
    if (this.confirmReset === true) {
      this.confirmReset = false;

      const setLogsSub = this.logStorage.setLogs([]).subscribe({
        next: () => {
          this.refreshLogs();
        },
        error: (err) => {
          console.error(err);
        },
      });
      this.subs.add(setLogsSub);

      return;
    }

    this.confirmReset = true;

    setTimeout(() => {
      this.confirmReset = false;
    }, 5000);
  }

  formatData(log: unknown) {
    if (typeof log === 'string') {
      return JSON.parse(log);
    }
    return log;
  }
}
