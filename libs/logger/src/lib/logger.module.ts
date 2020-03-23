import { LoggerService } from './logger.service';
import { LoggerConfig } from './logger.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerConfigService } from './logger.config';

@NgModule({
  imports: [CommonModule]
})
export class LoggerModule {
  static forRoot(config: LoggerConfig) {
    return {
      ngModule: LoggerModule,
      providers: [
        LoggerService,
        { provide: LoggerConfigService, useValue: config }
      ]
    };
  }
}
