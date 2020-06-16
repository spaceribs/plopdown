import { TestBed } from '@angular/core/testing';

import { BrowserActionPubService } from './browser-action-pub.service';
import { MockMessagesModule } from '@plopdown/messages/mock';
import { MockLoggerModule } from '@plopdown/logger/mock';

describe('BrowserActionPubService', () => {
  let service: BrowserActionPubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockMessagesModule, MockLoggerModule],
    });
    service = TestBed.inject(BrowserActionPubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
