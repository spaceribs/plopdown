import { TestBed } from '@angular/core/testing';

import { PermissionsService } from './permissions.service';
import { MockBrowserRefModule } from '@plopdown/browser-ref/mock';

describe('PermissionsService', () => {
  let service: PermissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockBrowserRefModule],
    });
    service = TestBed.inject(PermissionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
