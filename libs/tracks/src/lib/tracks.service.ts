import { StorageService, StorageAreaName } from '@plopdown/browser';
import { Injectable } from '@angular/core';
import { Track } from './track.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const STORAGE_KEY = 'tracks';

@Injectable()
export class TracksService {
  constructor(private storage: StorageService) {}

  public setTracks(tracks: Track[]) {
    return this.storage.set(StorageAreaName.Local, {
      [STORAGE_KEY]: tracks
    });
  }

  public getTracks(): Observable<Track[] | null> {
    return this.storage.get(StorageAreaName.Local, STORAGE_KEY).pipe(
      map(store => {
        return store[STORAGE_KEY];
      })
    );
  }
}
