import { InjectionToken } from '@angular/core';

export const TRACK_FILES_TOKEN = new InjectionToken<Map<string, string>>(
  'Track Files'
);
