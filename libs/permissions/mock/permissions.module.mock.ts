import { NgModule } from '@angular/core';
import { PermissionsModule, PermissionsService } from '@plopdown/permissions';
import { MockPermissionsService } from './permissions.service.mock';

@NgModule({
  imports: [PermissionsModule],
  providers: [
    { provide: PermissionsService, useClass: MockPermissionsService },
  ],
})
export class MockPermissionsModule {}
