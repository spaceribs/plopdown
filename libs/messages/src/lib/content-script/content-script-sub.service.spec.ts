import { TestBed } from '@angular/core/testing';

import { ContentScriptSubService } from './content-script-sub.service';

describe('ContentScriptSubService', () => {
  let service: ContentScriptSubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentScriptSubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
