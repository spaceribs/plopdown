import { WebNavigationService } from '@plopdown/browser-ref';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';

@Injectable()
export class MockWebNavigationService implements Partial<WebNavigationService> {
  getOnCompleted = jest.fn().mockReturnValue(EMPTY);
}
