import { async, TestBed } from '@angular/core/testing';
import { PlopdownCuesModule } from './plopdown-cues.module';

describe('PlopdownCuesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PlopdownCuesModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PlopdownCuesModule).toBeDefined();
  });
});
