import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import { ExtStorageService } from '../src/lib/ext-storage.service';

@Injectable()
export class MockExtStorageService implements Partial<ExtStorageService> {
  get = jest.fn().mockReturnValue(EMPTY);
  getOnChanged = jest.fn().mockReturnValue(EMPTY);
}
