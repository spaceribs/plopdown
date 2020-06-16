import { Injectable } from '@angular/core';
import { XPathService } from '@plopdown/window-ref';

@Injectable()
export class MockXPathService implements Partial<XPathService> {
  getElement = jest.fn();
}
