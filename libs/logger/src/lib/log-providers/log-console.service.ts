import { Injectable, Inject, isDevMode } from '@angular/core';
import { LoggerModule } from '../logger.module';
import { LoggerConfigService } from '../logger.config';
import { LogProvider } from './log-provider.model';

@Injectable({
  providedIn: LoggerModule,
})
export class LogConsoleService implements LogProvider {
  private appName: string;
  private css: string;
  private isDevMode: boolean;

  constructor(@Inject(LoggerConfigService) config) {
    this.isDevMode = isDevMode();
    this.css = `color: ${config.color}; font-weight: bold;`;
    this.appName = `%c[${config.appName}]`;
  }

  debug(message?: any, ...optionalParams: any[]): void {
    if (this.isDevMode) {
      console.debug(`${this.appName}`, this.css, message, ...optionalParams);
    }
  }

  log(message?: any, ...optionalParams: any[]) {
    if (this.isDevMode) {
      console.log(this.appName, this.css, message, ...optionalParams);
    }
  }

  error(message?: any, ...optionalParams: any[]) {
    console.error(this.appName, this.css, message, ...optionalParams);
  }

  info(message?: any, ...optionalParams: any[]) {
    console.info(this.appName, this.css, message, ...optionalParams);
  }

  warn(message?: any, ...optionalParams: any[]) {
    console.warn(this.appName, this.css, message, ...optionalParams);
  }
}
