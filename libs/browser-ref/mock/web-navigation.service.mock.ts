import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { WebNavigationService } from '../src/lib/web-navigation.service';

@Injectable()
export class MockWebNavigationService implements Partial<WebNavigationService> {
  getOnCompleted = jest.fn().mockReturnValue(EMPTY);
}
