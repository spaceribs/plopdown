import { TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserRefModule } from './browser-ref.module';

describe('BrowserRefModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserRefModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(BrowserRefModule).toBeDefined();
  });
});
