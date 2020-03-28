import { LoggerConfigService } from './logger.config';
import { Injectable, Inject, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private devMode: boolean;
  private appName: string;
  private css: string;

  constructor(@Inject(LoggerConfigService) config) {
    this.devMode = isDevMode();
    this.css = `color: ${config.color}; font-weight: bold;`;
    this.appName = `%c[${config.appName}]`;

    if (this.devMode) {
      this.info('Logger service in dev mode.');
    } else {
      this.info('Logger service in prod mode.');
    }
  }

  debug(message?: any, ...optionalParams: any[]): void {
    if (this.devMode) {
      console.debug(`${this.appName}`, this.css, message, ...optionalParams);
    }
  }

  log(message?: any, ...optionalParams: any[]) {
    if (this.devMode) {
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
