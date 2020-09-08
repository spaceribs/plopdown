import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksModalComponent } from './tracks-modal.component';

describe('TrackSelectorComponent', () => {
  let component: TracksModalComponent;
  let fixture: ComponentFixture<TracksModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TracksModalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
