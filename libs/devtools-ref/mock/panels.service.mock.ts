import { PanelsService } from '../src/lib/panels.service';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';

@Injectable()
export class MockPanelsService implements Partial<PanelsService> {
  public getHidden = jest.fn().mockReturnValue(EMPTY);
  public getShown = jest.fn().mockReturnValue(EMPTY);
}
