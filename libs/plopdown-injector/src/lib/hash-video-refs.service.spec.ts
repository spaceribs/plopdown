import { LzStringModule } from '@plopdown/lz-string';
import { MockPlopdownFileModule } from '@plopdown/plopdown-file/mock';
import { TestBed } from '@angular/core/testing';
import { MockWindowRefModule } from '@plopdown/window-ref/mock';

import { HashVideoRefsService } from './hash-video-refs.service';

describe('HashVideoRefsService', () => {
  let service: HashVideoRefsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockWindowRefModule, MockPlopdownFileModule, LzStringModule],
      providers: [HashVideoRefsService],
    });
    service = TestBed.inject(HashVideoRefsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
