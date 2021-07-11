import { TestBed } from '@angular/core/testing';

import { BrowserActionSubService } from './browser-action-sub.service';
import { MockMessagesModule } from '../../../mock';
import { MockLoggerModule } from '@plopdown/logger/mock';

describe('BrowserActionSubService', () => {
  let service: BrowserActionSubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockMessagesModule, MockLoggerModule],
    });
    service = TestBed.inject(BrowserActionSubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
