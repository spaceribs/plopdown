import { Injectable } from '@angular/core';
import { LogProvider } from '../src/lib/log-providers/log-provider.model';

@Injectable()
export class LogMockService implements LogProvider {
  debug = jest.fn();
  log = jest.fn();
  error = jest.fn();
  info = jest.fn();
  warn = jest.fn();
}
