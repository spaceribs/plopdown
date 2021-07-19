import { MockLoggerModule } from '@plopdown/logger/mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { RemoteValidatorService } from './remote-validator.service';

describe('RemoteValidatorService', () => {
  let service: RemoteValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MockLoggerModule],
      providers: [RemoteValidatorService],
    });
    service = TestBed.inject(RemoteValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
