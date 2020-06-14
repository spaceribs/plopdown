import { async, TestBed } from '@angular/core/testing';
import { WindowRefModule } from './window-ref.module';

describe('WindowRefModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [WindowRefModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(WindowRefModule).toBeDefined();
  });
});
