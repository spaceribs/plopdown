import { LoggerService } from '@plopdown/logger';
import { ExtStorageService, ExtStorageAreaName } from '@plopdown/ext-storage';
import { Injectable, OnDestroy } from '@angular/core';
import { Track } from './track.model';
import {
  map,
  filter,
  shareReplay,
  pluck,
  tap,
  concatMap
} from 'rxjs/operators';
import { Observable, merge, Subscription, Subject } from 'rxjs';
import { TracksModule } from './tracks.module';

const STORAGE_KEY = 'tracks';

@Injectable({
  providedIn: TracksModule
})
export class TracksService implements OnDestroy {
  private tracks$: Observable<Track[] | null>;
  private setTracks$: Subject<Track[]> = new Subject();
  private subs: Subscription = new Subscription();

  constructor(
    private storage: ExtStorageService,
    private logger: LoggerService
  ) {
    const changed$ = storage.getOnChanged().pipe(
      filter(([_, area]) => area === ExtStorageAreaName.Local),
      map(([changes]) => changes),
      filter(changes => changes[STORAGE_KEY] != null),
      map(changes => changes[STORAGE_KEY].newValue)
    );

    const initial$ = storage.get(ExtStorageAreaName.Local, [STORAGE_KEY]).pipe(
      tap(initial => this.logger.debug('Initial Tracks', initial)),
      pluck(STORAGE_KEY)
    );

    this.tracks$ = merge(initial$, changed$).pipe(shareReplay(1));

    const setTracksSub = this.setTracks$
      .pipe(
        concatMap(tracks => {
          return this.storage.set(ExtStorageAreaName.Local, {
            [STORAGE_KEY]: tracks
          });
        })
      )
      .subscribe({
        next: () => {
          logger.debug('Tracks Set');
        }
      });
    this.subs.add(setTracksSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public setTracks(tracks: Track[]) {
    this.setTracks$.next(tracks);
  }

  public getTracks(): Observable<Track[] | null> {
    return this.tracks$;
  }

  public getTrack(id: Track['id']): Observable<Track | null> {
    return this.tracks$.pipe(
      map(tracks => {
        return tracks.find(track => track.id === id);
      })
    );
  }
}
