import { TestBed, waitForAsync } from '@angular/core/testing';
import { WindowRefModule } from './window-ref.module';

describe('WindowRefModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [WindowRefModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(WindowRefModule).toBeDefined();
  });
});
