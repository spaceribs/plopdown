import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockMessagesModule } from '@plopdown/messages/mock';
import { TestBed } from '@angular/core/testing';

import { ContentScriptTracksService } from './content-script-tracks.service';

describe('ContentScriptTracksService', () => {
  let service: ContentScriptTracksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockMessagesModule, MockLoggerModule],
    });
    service = TestBed.inject(ContentScriptTracksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
