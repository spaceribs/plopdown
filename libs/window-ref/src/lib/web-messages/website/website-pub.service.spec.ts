import { TestBed } from '@angular/core/testing';

import { WebsiteWebPubService } from './website-pub.service';
import { MockMessagesModule } from '@plopdown/messages/mock';
import { MockLoggerModule } from '@plopdown/logger/mock';

describe('WebsiteWebPubService', () => {
  let service: WebsiteWebPubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockMessagesModule, MockLoggerModule],
    });
    service = TestBed.inject(WebsiteWebPubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
