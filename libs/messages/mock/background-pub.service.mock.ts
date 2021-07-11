import { Injectable } from '@angular/core';
import { BackgroundPubService } from '../src/lib/background';

@Injectable()
export class MockBackgroundPubService implements Partial<BackgroundPubService> {
  public checkAlive = jest.fn();
  public findVideos = jest.fn();
  public contentFound = jest.fn();
  public trackFound = jest.fn();
  public videoRefsFound = jest.fn();
}
