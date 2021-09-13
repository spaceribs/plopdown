import { TestBed } from '@angular/core/testing';

import { DevtoolSubService } from './devtool-sub.service';
import { MockMessagesModule } from '../../../mock';
import { MockLoggerModule } from '@plopdown/logger/mock';

describe('DevtoolSubService', () => {
  let service: DevtoolSubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockMessagesModule, MockLoggerModule],
    });
    service = TestBed.inject(DevtoolSubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
