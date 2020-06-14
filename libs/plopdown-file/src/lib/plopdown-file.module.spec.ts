import { async, TestBed } from '@angular/core/testing';
import { PlopdownFileModule } from './plopdown-file.module';

describe('PlopdownFileModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PlopdownFileModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PlopdownFileModule).toBeDefined();
  });
});
