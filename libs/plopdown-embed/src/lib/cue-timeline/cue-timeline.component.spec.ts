import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CueTimelineComponent } from './cue-timeline.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CueTimelineComponent', () => {
  let component: CueTimelineComponent;
  let fixture: ComponentFixture<CueTimelineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [CueTimelineComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CueTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
