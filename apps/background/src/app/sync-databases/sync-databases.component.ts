import { Track, TracksService } from '@plopdown/tracks';
import { LoggerService } from '@plopdown/logger';
import { map, switchMap } from 'rxjs/operators';
import { UnsavedVideoRef, VideoRefsService } from '@plopdown/video-refs';
import { Observable, combineLatest, Subscription, of } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RemotesService } from '@plopdown/remotes';

@Component({
  selector: 'plopdown-sync-databases',
  template: '',
})
export class SyncDatabasesComponent implements OnInit, OnDestroy {
  remotesSync$: Observable<
    [
      (
        | PouchDB.Replication.SyncResult<UnsavedVideoRef>
        | PouchDB.Replication.SyncResultComplete<UnsavedVideoRef>
      ),
      (
        | PouchDB.Replication.SyncResult<Track>
        | PouchDB.Replication.SyncResultComplete<Track>
      )
    ][]
  >;
  remotesPull$: Observable<
    [
      PouchDB.Replication.ReplicationResult<UnsavedVideoRef>,
      PouchDB.Replication.ReplicationResult<Track>
    ][]
  >;

  private subs: Subscription = new Subscription();

  constructor(
    remotesService: RemotesService,
    videoRefs: VideoRefsService,
    tracks: TracksService,
    private logger: LoggerService
  ) {
    this.remotesSync$ = remotesService.getRemotes().pipe(
      map((remotes) => {
        return remotes.filter((remote) => remote.sync);
      }),
      switchMap((remotes) => {
        if (remotes.length < 1) {
          return of([]);
        }

        const syncs = remotes.map((remote) => {
          return combineLatest([
            videoRefs.syncronizeRemoteDB(remote),
            tracks.syncronizeRemoteDB(remote),
          ]);
        });
        return combineLatest(syncs);
      })
    );

    this.remotesPull$ = remotesService.getRemotes().pipe(
      map((remotes) => {
        return remotes.filter((remote) => remote.sync === false);
      }),
      switchMap((remotes) => {
        if (remotes.length < 1) {
          return of([]);
        }

        const syncs = remotes.map((remote) => {
          return combineLatest([
            videoRefs.pullRemoteDB(remote),
            tracks.pullRemoteDB(remote),
          ]);
        });
        return combineLatest(syncs);
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    const syncSub = this.remotesSync$.subscribe({
      next: (syncs) => {
        this.logger.debug("Sync'd with Read/Write Remotes", syncs);
      },
      error: (err) => {
        this.logger.error('Sync Failed', err);
      },
    });
    this.subs.add(syncSub);

    const pullSub = this.remotesPull$.subscribe({
      next: (syncs) => {
        this.logger.debug('Pulled from Read Only Remotes', syncs);
      },
      error: (err) => {
        this.logger.error('Pull Failed', err);
      },
    });
    this.subs.add(pullSub);
  }
}
