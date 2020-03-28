import { TestBed } from '@angular/core/testing';

import { ContentScriptPubService } from './content-script-pub.service';

describe('ContentScriptPubService', () => {
  let service: ContentScriptPubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentScriptPubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
