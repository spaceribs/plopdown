import { BackgroundSubService } from '@plopdown/messages';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';

@Injectable()
export class MockBackgroundSubService implements Partial<BackgroundSubService> {
  public getCheckAlive = jest.fn().mockReturnValue(EMPTY);
  public getFindVideos = jest.fn().mockReturnValue(EMPTY);
  public getContentFound = jest.fn().mockReturnValue(EMPTY);
  public getTrackFound = jest.fn().mockReturnValue(EMPTY);
  public getVideoRefsFound = jest.fn().mockReturnValue(EMPTY);
  public getStatus = jest.fn().mockReturnValue(EMPTY);
}
