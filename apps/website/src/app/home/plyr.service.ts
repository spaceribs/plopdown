import { Injectable } from '@angular/core';

import Plyr from 'plyr';

@Injectable({
  providedIn: 'root',
})
export class PlyrService {
  constructor() {}

  create(selector: HTMLElement) {
    return new Plyr(selector);
  }
}
