import { async, TestBed } from '@angular/core/testing';
import { LzStringModule } from './lz-string.module';

describe('LzStringModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LzStringModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LzStringModule).toBeDefined();
  });
});
