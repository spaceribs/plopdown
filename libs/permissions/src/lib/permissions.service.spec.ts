import { MockPouchDBModule } from '@plopdown/pouchdb/mock';
import { MockLoggerModule } from '@plopdown/logger/mock';
import { TestBed } from '@angular/core/testing';

import { PermissionsService } from './permissions.service';

describe('PermissionsService', () => {
  let service: PermissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockLoggerModule, MockPouchDBModule],
      providers: [PermissionsService],
    });
    service = TestBed.inject(PermissionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
