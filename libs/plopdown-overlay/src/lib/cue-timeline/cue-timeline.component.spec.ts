import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CueTimelineComponent } from './cue-timeline.component';

describe('CueTimelineComponent', () => {
  let component: CueTimelineComponent;
  let fixture: ComponentFixture<CueTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CueTimelineComponent ]
    })
    .compileComponents();
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
