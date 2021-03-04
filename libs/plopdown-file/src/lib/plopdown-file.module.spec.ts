import { TestBed, waitForAsync } from '@angular/core/testing';
import { PlopdownFileModule } from './plopdown-file.module';

describe('PlopdownFileModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PlopdownFileModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PlopdownFileModule).toBeDefined();
  });
});
