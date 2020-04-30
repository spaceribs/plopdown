import { SavedTrack } from '@plopdown/tracks';
import { InjectionToken } from '@angular/core';

export const TRACK_TOKEN = new InjectionToken<SavedTrack>('Plopdown Track');
