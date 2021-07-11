import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { PermissionsRequestService } from '../src/lib/permissions-req.service';

@Injectable()
export class MockPermissionsRequestService
  implements Partial<PermissionsRequestService> {
  getAll = jest.fn().mockReturnValue(EMPTY);
}
