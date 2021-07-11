import { TestBed } from '@angular/core/testing';

import { WindowRefService } from './window-ref.service';
import { MockWindowRefModule } from '../../mock';

describe('WindowRefService', () => {
  let service: WindowRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockWindowRefModule],
    });
    service = TestBed.inject(WindowRefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
