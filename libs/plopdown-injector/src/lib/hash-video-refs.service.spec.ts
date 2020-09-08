import { TestBed } from '@angular/core/testing';

import { HashVideoRefsService } from './hash-video-refs.service';

describe('HashVideoRefsService', () => {
  let service: HashVideoRefsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HashVideoRefsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
