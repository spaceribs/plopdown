import { EMPTY } from 'rxjs';
import { Injectable } from '@angular/core';
import {} from '@plopdown/logger';
import { PermissionsService } from '../src/lib/permissions.service';

@Injectable()
export class MockPermissionsService implements Partial<PermissionsService> {
  getPermissions = jest.fn().mockReturnValue(EMPTY);
  getLoading = jest.fn().mockReturnValue(EMPTY);
}
