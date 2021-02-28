import { EMPTY } from 'rxjs';
import { ExtStorageService } from '@plopdown/ext-storage';
import { Injectable } from '@angular/core';

@Injectable()
export class MockExtStorageService implements Partial<ExtStorageService> {
  get = jest.fn().mockReturnValue(EMPTY);
  getOnChanged = jest.fn().mockReturnValue(EMPTY);
}
