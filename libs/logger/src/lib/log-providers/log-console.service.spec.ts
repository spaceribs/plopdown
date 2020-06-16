import { TestBed } from '@angular/core/testing';

import { LogConsoleService } from './log-console.service';
import { LoggerConfigService } from '../logger.config';
import { MOCK_CONFIG } from '../../../mock/logger.module.mock';

describe('LogConsoleService', () => {
  let service: LogConsoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LoggerConfigService, useValue: MOCK_CONFIG },
        LogConsoleService,
      ],
    });
    service = TestBed.inject(LogConsoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
