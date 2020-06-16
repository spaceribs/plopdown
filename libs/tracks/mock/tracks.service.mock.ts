import { Injectable } from '@angular/core';
import { TracksService } from '@plopdown/tracks';
import { EMPTY } from 'rxjs';

@Injectable()
export class MockTracksService implements Partial<TracksService> {
  getLoading = jest.fn().mockReturnValue(EMPTY);
  resetTracks = jest.fn().mockReturnValue(EMPTY);
  addTrack = jest.fn().mockReturnValue(EMPTY);
  attachTrackFile = jest.fn().mockReturnValue(EMPTY);
  updateTrack = jest.fn().mockReturnValue(EMPTY);
  removeTrack = jest.fn().mockReturnValue(EMPTY);
  getTracks = jest.fn().mockReturnValue(EMPTY);
  getTrack = jest.fn().mockReturnValue(EMPTY);
  refreshTracks = jest.fn();
}
