import { TestBed, waitForAsync } from '@angular/core/testing';
import { LoggerModule } from './logger.module';

describe('LoggerModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LoggerModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LoggerModule).toBeDefined();
  });
});
