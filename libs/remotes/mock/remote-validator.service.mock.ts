import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { RemoteValidatorService } from '../src/lib/remote-validator.service';

@Injectable()
export class MockRemoteValidatorService
  implements Partial<RemoteValidatorService>
{
  validate = jest.fn().mockReturnValue(EMPTY);
  canConnect = jest.fn().mockReturnValue(EMPTY);
}
