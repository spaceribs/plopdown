import { Injectable, Inject } from '@angular/core';
import { LogProvider, LoggerConfigService } from '@plopdown/logger';

@Injectable()
export class LogMockService implements LogProvider {
  constructor(@Inject(LoggerConfigService) config) {}
  debug = jest.fn();
  log = jest.fn();
  error = jest.fn();
  info = jest.fn();
  warn = jest.fn();
}
