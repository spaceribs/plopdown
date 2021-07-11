import { TestBed } from '@angular/core/testing';

import { RuntimeService } from './runtime.service';
import { MockBrowserRefModule } from '../../mock';

describe('RuntimeService', () => {
  let service: RuntimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockBrowserRefModule],
    });
    service = TestBed.inject(RuntimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
