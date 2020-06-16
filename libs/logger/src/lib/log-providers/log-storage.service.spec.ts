import { MOCK_CONFIG } from '../../../mock/logger.module.mock';
import { TestBed } from '@angular/core/testing';

import { LogStorageService } from './log-storage.service';
import { LoggerConfigService } from '../logger.config';

describe('LogStorageService', () => {
  let service: LogStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LoggerConfigService, useValue: MOCK_CONFIG },
        LogStorageService,
      ],
    });
    service = TestBed.inject(LogStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
