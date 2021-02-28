import { MockBrowserRefModule } from '@plopdown/browser-ref/mock';
import { TestBed } from '@angular/core/testing';

import { WebNavigationService } from './web-navigation.service';

describe('WebNavigationService', () => {
  let service: WebNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockBrowserRefModule],
      providers: [WebNavigationService],
    });
    service = TestBed.inject(WebNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
