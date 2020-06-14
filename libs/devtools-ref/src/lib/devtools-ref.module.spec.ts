import { async, TestBed } from '@angular/core/testing';
import { DevtoolsRefModule } from './devtools-ref.module';

describe('DevtoolsRefModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DevtoolsRefModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DevtoolsRefModule).toBeDefined();
  });
});
