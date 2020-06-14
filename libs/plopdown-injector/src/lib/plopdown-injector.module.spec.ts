import { async, TestBed } from '@angular/core/testing';
import { PlopdownInjectorModule } from './plopdown-injector.module';

describe('PlopdownInjectorModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PlopdownInjectorModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PlopdownInjectorModule).toBeDefined();
  });
});
