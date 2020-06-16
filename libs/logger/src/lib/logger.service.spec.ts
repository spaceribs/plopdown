import { MockLoggerModule } from '@plopdown/logger/mock';
import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';
import { LoggerConfigService } from './logger.config';
import { MOCK_CONFIG } from '../../mock/logger.module.mock';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockLoggerModule],
      providers: [
        { provide: LoggerConfigService, useValue: MOCK_CONFIG },
        LoggerService,
      ],
    });
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
