import { TestBed, waitForAsync } from '@angular/core/testing';
import { ExtStorageModule } from './ext-storage.module';

describe('ExtStorageModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ExtStorageModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ExtStorageModule).toBeDefined();
  });
});
