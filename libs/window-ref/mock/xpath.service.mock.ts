import { Injectable } from '@angular/core';
import { XPathService } from '../src/lib/xpath.service';

@Injectable()
export class MockXPathService implements Partial<XPathService> {
  getElement = jest.fn();
}
