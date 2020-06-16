import { Injectable, Inject } from '@angular/core';
import {
  LoggerModule,
  LogProvider,
  LoggerConfigService,
} from '@plopdown/logger';

@Injectable({
  providedIn: LoggerModule,
})
export class LogMockService implements LogProvider {
  constructor(@Inject(LoggerConfigService) config) {}
  debug = jest.fn();
  log = jest.fn();
  error = jest.fn();
  info = jest.fn();
  warn = jest.fn();
}
