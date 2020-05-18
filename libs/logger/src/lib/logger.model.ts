import { LogProvider } from './log-providers/log-provider.model';
import { Type } from '@angular/core';

export interface LoggerConfig {
  appName: string;
  color: string;
  providers: Type<LogProvider>[];
}
