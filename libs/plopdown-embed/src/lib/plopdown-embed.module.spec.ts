import { async, TestBed } from '@angular/core/testing';
import { PlopdownEmbedModule } from './plopdown-embed.module';

describe('PlopdownCuesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PlopdownEmbedModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PlopdownEmbedModule).toBeDefined();
  });
});
