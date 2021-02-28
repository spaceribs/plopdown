import { EMPTY } from 'rxjs';
import { PermissionsService } from '@plopdown/permissions';
import { Injectable } from '@angular/core';
import {} from '@plopdown/logger';

@Injectable()
export class MockPermissionsService implements Partial<PermissionsService> {
  getPermissions = jest.fn().mockReturnValue(EMPTY);
  getLoading = jest.fn().mockReturnValue(EMPTY);
}
