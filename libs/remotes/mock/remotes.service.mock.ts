import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { RemotesService } from '../src/lib/remotes.service';

@Injectable()
export class MockRemotesService implements Partial<RemotesService> {
  refreshRemotes = jest.fn();
  getRemotes = jest.fn().mockReturnValue(EMPTY);
  getLoading = jest.fn().mockReturnValue(EMPTY);
  getError = jest.fn().mockReturnValue(EMPTY);
  resetRemotes = jest.fn().mockReturnValue(EMPTY);
  updateRemote = jest.fn().mockReturnValue(EMPTY);
  addRemote = jest.fn().mockReturnValue(EMPTY);
  removeRemote = jest.fn().mockReturnValue(EMPTY);
}
