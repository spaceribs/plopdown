import { async, TestBed } from '@angular/core/testing';
import { IconModule } from './icon.module';

describe('IconModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IconModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(IconModule).toBeDefined();
  });
});
