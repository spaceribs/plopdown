import { NgModule } from '@angular/core';
import {
  LoggerConfig,
  LoggerModule,
  LoggerConfigService,
} from '@plopdown/logger';
import { LogMockService } from './log-mock.service.mock';

export const MOCK_CONFIG: LoggerConfig = {
  appName: 'mock',
  color: 'red',
  providers: [LogMockService],
};

@NgModule({
  imports: [LoggerModule],
  providers: [{ provide: LoggerConfigService, useValue: MOCK_CONFIG }],
})
export class MockLoggerModule {}
