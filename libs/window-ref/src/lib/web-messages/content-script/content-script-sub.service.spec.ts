import { TestBed } from '@angular/core/testing';

import { ContentScriptSubService } from './content-script-sub.service';
import { MockMessagesModule } from '@plopdown/messages/mock';
import { MockLoggerModule } from '@plopdown/logger/mock';

describe('ContentScriptSubService', () => {
  let service: ContentScriptSubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockMessagesModule, MockLoggerModule],
    });
    service = TestBed.inject(ContentScriptSubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
