import { MockVideoRefsModule } from '@plopdown/video-refs/mock';
import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockTracksModule } from '@plopdown/tracks/mock';
import { MockMessagesModule } from '@plopdown/messages/mock';
import { TestBed } from '@angular/core/testing';

import { ContentScriptVideoRefsService } from './content-script-video-refs.service';

describe('ContentScriptVideoRefsService', () => {
  let service: ContentScriptVideoRefsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MockMessagesModule,
        MockVideoRefsModule,
        MockTracksModule,
        MockLoggerModule,
      ],
    });
    service = TestBed.inject(ContentScriptVideoRefsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
