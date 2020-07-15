import { TestBed } from '@angular/core/testing';

import { WebMessagesService } from './web-messages.service';

describe('WebMessageService', () => {
  let service: WebMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
