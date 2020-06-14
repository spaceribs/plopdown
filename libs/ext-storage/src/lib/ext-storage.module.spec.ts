import { async, TestBed } from '@angular/core/testing';
import { ExtStorageModule } from './ext-storage.module';

describe('ExtStorageModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExtStorageModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ExtStorageModule).toBeDefined();
  });
});
