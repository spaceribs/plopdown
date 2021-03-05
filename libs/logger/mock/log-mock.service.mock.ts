import { Injectable } from '@angular/core';
import { LogProvider } from '@plopdown/logger';

@Injectable()
export class LogMockService implements LogProvider {
  debug = jest.fn();
  log = jest.fn();
  error = jest.fn();
  info = jest.fn();
  warn = jest.fn();
}
