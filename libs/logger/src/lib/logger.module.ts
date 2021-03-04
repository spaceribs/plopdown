import { LoggerConfig } from './logger.model';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerConfigService } from './logger.config';

@NgModule({
  imports: [CommonModule],
})
export class LoggerModule {
  static forRoot(config: LoggerConfig): ModuleWithProviders<LoggerModule> {
    return {
        ngModule: LoggerModule,
        providers: [{ provide: LoggerConfigService, useValue: config }],
    };
}
}
