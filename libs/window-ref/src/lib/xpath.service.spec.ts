import { TestBed } from '@angular/core/testing';

import { XPathService } from './xpath.service';
import { MockWindowRefModule } from '@plopdown/window-ref/mock';

describe('XpathService', () => {
  let service: XPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockWindowRefModule],
    });
    service = TestBed.inject(XPathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
