import { TestBed } from '@angular/core/testing';

import { WebsiteWebSubService } from './website-sub.service';
import { MockMessagesModule } from '@plopdown/messages/mock';
import { MockLoggerModule } from '@plopdown/logger/mock';

describe('WebsiteWebSubService', () => {
  let service: WebsiteWebSubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockMessagesModule, MockLoggerModule],
    });
    service = TestBed.inject(WebsiteWebSubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
