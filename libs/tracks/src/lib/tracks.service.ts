import { StorageService, StorageAreaName } from '@plopdown/browser-ref';
import { Injectable } from '@angular/core';
import { Track } from './track.model';
import { map, filter, shareReplay, pluck } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';
import { TracksModule } from './tracks.module';

const STORAGE_KEY = 'tracks';

@Injectable({
  providedIn: TracksModule
})
export class TracksService {
  private tracks$: Observable<Track[] | null>;

  constructor(private storage: StorageService) {
    const changed$ = storage.getOnChanged().pipe(
      filter(([_, area]) => area === StorageAreaName.Local),
      filter(([changes]) => changes[STORAGE_KEY] != null),
      map(([changes]) => {
        return changes[STORAGE_KEY];
      })
    );

    const initial$ = storage
      .get(StorageAreaName.Local, STORAGE_KEY)
      .pipe(pluck(STORAGE_KEY));

    this.tracks$ = merge(initial$, changed$).pipe(shareReplay(1));
  }

  public setTracks(tracks: Track[]) {
    return this.storage.set(StorageAreaName.Local, {
      [STORAGE_KEY]: tracks
    });
  }

  public getTracks(): Observable<Track[] | null> {
    return this.tracks$;
  }
}
