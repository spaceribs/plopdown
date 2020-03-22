import { async, TestBed } from '@angular/core/testing';
import { TracksModule } from './tracks.module';

describe('TracksModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TracksModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TracksModule).toBeDefined();
  });
});
