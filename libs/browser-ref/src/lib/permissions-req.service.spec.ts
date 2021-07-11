import { TestBed } from '@angular/core/testing';

import { PermissionsRequestService } from './permissions-req.service';
import { MockBrowserRefModule } from '../../mock';

describe('PermissionsService', () => {
  let service: PermissionsRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockBrowserRefModule],
    });
    service = TestBed.inject(PermissionsRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
