import { TestBed, waitForAsync } from '@angular/core/testing';
import { IconModule } from './icon.module';

describe('IconModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IconModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(IconModule).toBeDefined();
  });
});
