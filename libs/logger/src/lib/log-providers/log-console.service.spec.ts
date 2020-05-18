import { TestBed } from '@angular/core/testing';

import { LogConsoleService } from './log-console.service';

describe('LogConsoleService', () => {
  let service: LogConsoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogConsoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
