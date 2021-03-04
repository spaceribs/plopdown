import { TestBed, waitForAsync } from '@angular/core/testing';
import { TracksModule } from './tracks.module';

describe('TracksModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TracksModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TracksModule).toBeDefined();
  });
});
