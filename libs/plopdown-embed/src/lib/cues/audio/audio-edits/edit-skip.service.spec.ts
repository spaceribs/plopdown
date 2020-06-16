import { TestBed } from '@angular/core/testing';

import { EditSkipService } from './edit-skip.service';
import { AudioEditsService } from './audio-edits.service';

describe('EditSkipService', () => {
  let service: EditSkipService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditSkipService, AudioEditsService],
    });
    service = TestBed.inject(EditSkipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
