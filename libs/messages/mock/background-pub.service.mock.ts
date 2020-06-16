import { BackgroundPubService } from '@plopdown/messages';
import { Injectable } from '@angular/core';

@Injectable()
export class MockBackgroundPubService implements Partial<BackgroundPubService> {
  public checkAlive = jest.fn();
  public findVideos = jest.fn();
  public contentFound = jest.fn();
  public trackFound = jest.fn();
  public videoRefsFound = jest.fn();
}
