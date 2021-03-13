import { LoggerConfig } from './logger.model';
import { LogProvider } from './log-providers/log-provider.model';
import { LoggerModule } from './logger.module';
import { LoggerConfigService } from './logger.config';
import { Injectable, Inject, Injector } from '@angular/core';

@Injectable({
  providedIn: LoggerModule,
})
export class LoggerService implements LogProvider {
  private devMode = true;
  private providers: LogProvider[];

  constructor(
    @Inject(LoggerConfigService) config: LoggerConfig,
    private injector: Injector
  ) {
    this.providers = config.providers.map((provider) => {
      return this.injector.get<LogProvider>(provider);
    });

    if (this.devMode) {
      this.info('Logger started in dev mode.');
    } else {
      this.info('Logger started in prod mode.');
    }
  }

  debug(message?: any, ...optionalParams: any[]): void {
    this.providers.forEach((provider) => {
      provider.debug(message, ...optionalParams);
    });
  }

  log(message?: any, ...optionalParams: any[]): void {
    this.providers.forEach((provider) => {
      provider.log(message, ...optionalParams);
    });
  }

  error(message?: any, ...optionalParams: any[]): void {
    this.providers.forEach((provider) => {
      provider.error(message, ...optionalParams);
    });
  }

  info(message?: any, ...optionalParams: any[]): void {
    this.providers.forEach((provider) => {
      provider.info(message, ...optionalParams);
    });
  }

  warn(message?: any, ...optionalParams: any[]): void {
    this.providers.forEach((provider) => {
      provider.warn(message, ...optionalParams);
    });
  }
}
