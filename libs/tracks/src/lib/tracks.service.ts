import { StorageService, StorageAreaName } from '@plopdown/browser';
import { Injectable } from '@angular/core';
import { Track } from './track.model';

const STORAGE_KEY = 'tracks';

@Injectable()
export class TracksService {
  constructor(private storage: StorageService) {}

  public setTracks(tracks: Track[]) {
    return this.storage.set(StorageAreaName.Local, {
      [STORAGE_KEY]: tracks
    });
  }
}
