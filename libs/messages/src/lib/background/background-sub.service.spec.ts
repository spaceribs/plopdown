import { TestBed } from '@angular/core/testing';

import { BackgroundSubService } from './background-sub.service';
import { MockMessagesModule } from '@plopdown/messages/mock';
import { MockLoggerModule } from '@plopdown/logger/mock';

describe('BackgroundSubService', () => {
  let service: BackgroundSubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockMessagesModule, MockLoggerModule],
    });
    service = TestBed.inject(BackgroundSubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
