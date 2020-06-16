import { MockIconModule } from '@plopdown/icon/mock';
import { MockLoggerModule } from '@plopdown/logger/mock';
import { async, TestBed } from '@angular/core/testing';
import { PlopdownInjectorModule } from './plopdown-injector.module';

describe('PlopdownInjectorModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MockLoggerModule, PlopdownInjectorModule, MockIconModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PlopdownInjectorModule).toBeDefined();
  });
});
