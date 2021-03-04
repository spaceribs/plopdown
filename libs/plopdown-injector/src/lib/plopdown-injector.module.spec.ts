import { MockIconModule } from '@plopdown/icon/mock';
import { MockLoggerModule } from '@plopdown/logger/mock';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { PlopdownInjectorModule } from './plopdown-injector.module';

describe('PlopdownInjectorModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MockLoggerModule, PlopdownInjectorModule, MockIconModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PlopdownInjectorModule).toBeDefined();
  });
});
