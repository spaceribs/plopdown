import { NgModule } from '@angular/core';
import { PermissionsModule } from '../src/lib/permissions.module';
import { PermissionsService } from '../src/lib/permissions.service';
import { MockPermissionsService } from './permissions.service.mock';

@NgModule({
  imports: [PermissionsModule],
  providers: [
    { provide: PermissionsService, useClass: MockPermissionsService },
  ],
})
export class MockPermissionsModule {}
