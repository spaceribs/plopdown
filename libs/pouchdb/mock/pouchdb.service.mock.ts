import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { PouchDBService } from '../src/lib/pouchdb.service';

@Injectable()
export class MockPouchDBService implements Partial<PouchDBService> {
  createObservableDatabase = jest.fn().mockReturnValue(EMPTY);
  createObservableChanges = jest.fn().mockReturnValue(EMPTY);
  createObservableSync = jest.fn().mockReturnValue(EMPTY);
  createObservablePull = jest.fn().mockReturnValue(EMPTY);
}
