import { LoggerConfigService } from './logger.config';
import { Injectable, Inject, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private devMode: boolean;
  private appName: string;

  constructor(@Inject(LoggerConfigService) config) {
    this.devMode = isDevMode();
    this.appName = `[${config.appName}]`;

    if (this.devMode) {
      console.info('[LoggerService]', 'Logger service in dev mode.');
    } else {
      console.info('[LoggerService]', 'Logger service in prod mode.');
    }
  }

  debug(message?: any, ...optionalParams: any[]): void {
    if (this.devMode) {
      console.debug(`[${this.appName}]`, message, ...optionalParams);
    }
  }

  log(message?: any, ...optionalParams: any[]) {
    if (this.devMode) {
      console.log(this.appName, message, ...optionalParams);
    }
  }

  error(message?: any, ...optionalParams: any[]) {
    console.error(this.appName, message, ...optionalParams);
  }

  info(message?: any, ...optionalParams: any[]) {
    console.info(this.appName, message, ...optionalParams);
  }

  warn(message?: any, ...optionalParams: any[]) {
    console.warn(this.appName, message, ...optionalParams);
  }
}
