import { TestBed } from '@angular/core/testing';

import { DevtoolPubService } from './devtool-pub.service';
import { MockMessagesModule } from '../../../mock';
import { MockLoggerModule } from '@plopdown/logger/mock';

describe('DevtoolPubService', () => {
  let service: DevtoolPubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockMessagesModule, MockLoggerModule],
    });
    service = TestBed.inject(DevtoolPubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
