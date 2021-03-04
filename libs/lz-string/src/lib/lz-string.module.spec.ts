import { TestBed, waitForAsync } from '@angular/core/testing';
import { LzStringModule } from './lz-string.module';

describe('LzStringModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LzStringModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LzStringModule).toBeDefined();
  });
});
