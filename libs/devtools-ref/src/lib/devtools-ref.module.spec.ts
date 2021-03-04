import { TestBed, waitForAsync } from '@angular/core/testing';
import { DevtoolsRefModule } from './devtools-ref.module';

describe('DevtoolsRefModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DevtoolsRefModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DevtoolsRefModule).toBeDefined();
  });
});
