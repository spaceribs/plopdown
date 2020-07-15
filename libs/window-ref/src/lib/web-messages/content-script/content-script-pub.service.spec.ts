import { TestBed } from '@angular/core/testing';

import { ContentScriptPubService } from './content-script-pub.service';
import { MockMessagesModule } from '@plopdown/messages/mock';
import { MockLoggerModule } from '@plopdown/logger/mock';

describe('ContentScriptPubService', () => {
  let service: ContentScriptPubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockMessagesModule, MockLoggerModule],
    });
    service = TestBed.inject(ContentScriptPubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
