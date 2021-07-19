import { MockPouchDBModule } from '@plopdown/pouchdb/mock';
import { MockLoggerModule } from '@plopdown/logger/mock';
import { TestBed } from '@angular/core/testing';
import { RemotesService } from './remotes.service';

describe('RemotesService', () => {
  let service: RemotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockLoggerModule, MockPouchDBModule],
      providers: [RemotesService],
    });
    service = TestBed.inject(RemotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
