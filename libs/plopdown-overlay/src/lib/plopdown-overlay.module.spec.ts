import { async, TestBed } from '@angular/core/testing';
import { PlopdownOverlayModule } from './plopdown-overlay.module';

describe('PlopdownOverlayModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PlopdownOverlayModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PlopdownOverlayModule).toBeDefined();
  });
});
