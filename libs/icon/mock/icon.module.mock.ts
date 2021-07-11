import { MockIconComponent } from './icon.component.mock';
import { NgModule } from '@angular/core';
import { IconModule } from '../src/lib/icon.module';

@NgModule({
  imports: [IconModule],
  declarations: [MockIconComponent],
  exports: [MockIconComponent],
})
export class MockIconModule {}
