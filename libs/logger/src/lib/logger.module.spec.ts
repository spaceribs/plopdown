import { async, TestBed } from '@angular/core/testing';
import { LoggerModule } from './logger.module';

describe('LoggerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LoggerModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LoggerModule).toBeDefined();
  });
});
