import { MockDevtoolsRefModule } from '@plopdown/devtools-ref/mock';
import { TestBed } from '@angular/core/testing';

import { PanelsService } from './panels.service';

describe('PanelsService', () => {
  let service: PanelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockDevtoolsRefModule],
    });
    service = TestBed.inject(PanelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
