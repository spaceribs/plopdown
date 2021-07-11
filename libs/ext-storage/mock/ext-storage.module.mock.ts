import { NgModule } from '@angular/core';
import { ExtStorageModule } from '../src/lib/ext-storage.module';
import { ExtStorageService } from '../src/lib/ext-storage.service';
import { MockExtStorageService } from './ext-storage.service.mock';

@NgModule({
  imports: [ExtStorageModule],
  providers: [{ provide: ExtStorageService, useClass: MockExtStorageService }],
})
export class MockExtStorageModule {}
