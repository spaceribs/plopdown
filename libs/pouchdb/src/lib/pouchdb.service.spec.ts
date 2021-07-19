import { TestBed } from '@angular/core/testing';
import { PouchDBService } from './pouchdb.service';

jest.mock('pouchdb', () => {
  return {
    __esModule: true, // this property makes it work
    default: {
      plugin: jest.fn(),
    },
  };
});

describe('PouchDBService', () => {
  let service: PouchDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PouchDBService],
    });
    service = TestBed.inject(PouchDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
