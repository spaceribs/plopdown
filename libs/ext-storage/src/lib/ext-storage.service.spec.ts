import { MockExtStorageModule } from '@plopdown/ext-storage/mock';
import { MockBrowserRefModule } from '@plopdown/browser-ref/mock';
import { TestBed } from '@angular/core/testing';

import { ExtStorageService } from './ext-storage.service';

describe('ExtStorageService', () => {
  let service: ExtStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockExtStorageModule, MockBrowserRefModule],
    });
    service = TestBed.inject(ExtStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
