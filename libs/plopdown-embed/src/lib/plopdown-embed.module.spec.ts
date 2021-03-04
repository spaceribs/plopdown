import { TestBed, waitForAsync } from '@angular/core/testing';
import { PlopdownEmbedModule } from './plopdown-embed.module';

describe('PlopdownCuesModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PlopdownEmbedModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PlopdownEmbedModule).toBeDefined();
  });
});
