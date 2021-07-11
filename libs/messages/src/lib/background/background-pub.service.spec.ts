import { MockLoggerModule } from '@plopdown/logger/mock';
import { TestBed } from '@angular/core/testing';

import { BackgroundPubService } from './background-pub.service';
import { MockMessagesModule } from '../../../mock';

describe('BackgroundPubService', () => {
  let service: BackgroundPubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockMessagesModule, MockLoggerModule],
    });
    service = TestBed.inject(BackgroundPubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
