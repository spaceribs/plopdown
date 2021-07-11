import { NgModule } from '@angular/core';
import { LoggerConfigService } from '../src/lib/logger.config';
import { LoggerConfig } from '../src/lib/logger.model';
import { LoggerModule } from '../src/lib/logger.module';
import { LogMockService } from './log-mock.service.mock';

export const MOCK_CONFIG: LoggerConfig = {
  appName: 'mock',
  color: 'red',
  providers: [LogMockService],
};

@NgModule({
  imports: [LoggerModule],
  providers: [
    { provide: LoggerConfigService, useValue: MOCK_CONFIG },
    LogMockService,
  ],
})
export class MockLoggerModule {}
