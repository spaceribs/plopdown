import { NgModule } from '@angular/core';
import { ExtStorageModule, ExtStorageService } from '@plopdown/ext-storage';
import { MockExtStorageService } from './ext-storage.service.mock';

@NgModule({
  imports: [ExtStorageModule],
  providers: [{ provide: ExtStorageService, useClass: MockExtStorageService }],
})
export class MockExtStorageModule {}
