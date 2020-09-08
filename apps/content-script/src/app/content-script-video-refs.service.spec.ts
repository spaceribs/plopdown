import { TestBed } from '@angular/core/testing';

import { ContentScriptVideoRefsService } from './content-script-video-refs.service';

describe('ContentScriptVideoRefsService', () => {
  let service: ContentScriptVideoRefsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentScriptVideoRefsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
