import { MockWindowRefModule } from '@plopdown/window-ref/mock';
import { MockTracksModule } from '@plopdown/tracks/mock';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TrackSelectorComponent } from './track-selector.component';

describe('TrackSelectorComponent', () => {
  let component: TrackSelectorComponent;
  let fixture: ComponentFixture<TrackSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MockTracksModule,
        MockWindowRefModule,
      ],
      declarations: [TrackSelectorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
