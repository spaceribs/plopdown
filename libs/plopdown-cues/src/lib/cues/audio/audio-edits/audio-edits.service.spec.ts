import { TestBed } from '@angular/core/testing';

import { AudioEditsService } from './audio-edits.service';

describe('AudioEditsService', () => {
  let service: AudioEditsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AudioEditsService],
    });
    service = TestBed.inject(AudioEditsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
