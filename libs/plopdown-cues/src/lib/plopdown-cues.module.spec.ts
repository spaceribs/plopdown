import { TestBed, waitForAsync } from '@angular/core/testing';
import { PlopdownCuesModule } from './plopdown-cues.module';

describe('PlopdownCuesModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PlopdownCuesModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PlopdownCuesModule).toBeDefined();
  });
});
