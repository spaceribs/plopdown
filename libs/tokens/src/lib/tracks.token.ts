import { SavedTrack } from '@plopdown/tracks';
import { InjectionToken } from '@angular/core';

export const TRACKS_TOKEN = new InjectionToken<
  Map<SavedTrack['_id'], SavedTrack>
>('Plopdown Tracks');
