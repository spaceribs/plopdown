import { MockIconComponent } from './icon.component.mock';
import { NgModule } from '@angular/core';
import { IconModule } from '@plopdown/icon';

@NgModule({
  imports: [IconModule],
  declarations: [MockIconComponent],
  exports: [MockIconComponent],
})
export class MockIconModule {}
