import { PermissionsRequestService } from '@plopdown/browser-ref';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';

@Injectable()
export class MockPermissionsRequestService
  implements Partial<PermissionsRequestService> {
  getAll = jest.fn().mockReturnValue(EMPTY);
}
